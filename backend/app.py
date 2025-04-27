from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import requests
from datetime import datetime, timedelta, timezone
import time

def create_app():
    app = Flask(__name__)
    CORS(app)

    MODEL_PATH = "rf_hourly_temp.pkl"
    model = joblib.load(MODEL_PATH)

    def get_city_id(city_name, api_key):
        url = "https://api.openweathermap.org/data/2.5/weather"
        resp = requests.get(url, params={"q": city_name, "appid": api_key})
        resp.raise_for_status()
        data = resp.json()
        return data.get("id"), data.get("coord", {}).get("lat"), data.get("coord", {}).get("lon")

    def fetch_history_bulk(city_id, lat, lon, api_key, cnt=30):
        url = "http://history.openweathermap.org/data/2.5/history/city"
        params = {
            "id": city_id,
            "type": "hour",
            "cnt": cnt,
            "units": "standard",
            "appid": api_key
        }
        res = requests.get(url, params=params)
        res.raise_for_status()
        data = res.json()
        records = []
        for item in data.get("list", []):
            main = item.get("main", {})
            wind = item.get("wind", {})
            dt = datetime.fromtimestamp(item["dt"], tz=timezone.utc)
            records.append({
                "datetime": dt,
                "temperature": main.get("temp"),
                "humidity": main.get("humidity"),
                "pressure": main.get("pressure"),
                "wind_speed": wind.get("speed"),
                "wind_direction": wind.get("deg"),
                "Latitude": lat,
                "Longitude": lon
            })
        return pd.DataFrame(records)

    def make_features(df):
        df = df.sort_values("datetime").copy()
        for lag in [1, 2, 3, 6, 12, 24]:
            df[f"temp_lag_{lag}"] = df["temperature"].shift(lag)
        df["hour"] = df["datetime"].dt.hour
        df["dow"] = df["datetime"].dt.dayofweek
        df["month"] = df["datetime"].dt.month

        df["hour_sin"] = np.sin(2 * np.pi * df["hour"] / 24)
        df["hour_cos"] = np.cos(2 * np.pi * df["hour"] / 24)
        df["dow_sin"] = np.sin(2 * np.pi * df["dow"] / 7)
        df["dow_cos"] = np.cos(2 * np.pi * df["dow"] / 7)
        df["month_sin"] = np.sin(2 * np.pi * df["month"] / 12)

        for w in [3, 6]:
            df[f"temp_roll_mean_{w}h"] = df["temperature"].shift(1).rolling(window=w).mean()
            df[f"temp_roll_std_{w}h"] = df["temperature"].shift(1).rolling(window=w).std()

        # Drop NaNs
        df = df.dropna().reset_index(drop=True)

        # Match feature columns used during training
        model_features = model.feature_names_in_.tolist()
        return df[model_features]

    @app.route("/forecast-auto", methods=["GET"])
    def forecast_auto():
        api_key = request.args.get("appid")
        city_name = request.args.get("city_name")
        steps = request.args.get("steps", default=6, type=int)

        if not api_key:
            return jsonify({"error": "appid is required"}), 400
        if not city_name:
            return jsonify({"error": "city_name is required"}), 400
        if steps < 1 or steps > 24:
            return jsonify({"error": "steps must be between 1 and 24"}), 400

        try:
            # Get city_id, lat, lon
            city_id, lat, lon = get_city_id(city_name, api_key)
            if not city_id or not lat or not lon:
                return jsonify({"error": "City lookup failed"}), 404

            # Get history
            df = fetch_history_bulk(city_id, lat, lon, api_key)

            # Forecast next `steps` hours
            results = []
            for _ in range(steps):
                X_next = make_features(df).iloc[[-1]]
                y_pred = model.predict(X_next)[0]
                next_time = df["datetime"].max() + timedelta(hours=1)
                results.append({
                    "datetime": next_time.isoformat(),
                    "predicted_temperature": round(y_pred-273.15, 2)
                })

                # Append predicted point for recursive prediction
                last_row = df.iloc[-1].to_dict()
                df = pd.concat([df, pd.DataFrame([{
                    "datetime": next_time,
                    "temperature": y_pred,
                    "humidity": last_row["humidity"],
                    "pressure": last_row["pressure"],
                    "wind_speed": last_row["wind_speed"],
                    "wind_direction": last_row["wind_direction"],
                    "Latitude": last_row["Latitude"],
                    "Longitude": last_row["Longitude"]
                }])], ignore_index=True)

            return jsonify({"forecast": results})

        except ValueError as ve:
            return jsonify({"error": str(ve)}), 400
        except Exception as e:
            return jsonify({"error": "Internal server error", "details": str(e)}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=5000)
