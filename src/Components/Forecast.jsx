import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Clock } from "lucide-react";
import "./forecast.css";

// Icon & color selector based on hour of day
function getWeatherIcon(hour) {
  if (hour >= 6 && hour < 17) {
    return () => <span role="img" aria-label="day">🌞</span>;
  } else if (hour >= 17 && hour < 19) {
    return () => <span role="img" aria-label="evening">🌇</span>;
  } else {
    return () => <span role="img" aria-label="night">🌙</span>;
  }
}

function getCardStyle(hour) {
  if (hour >= 6 && hour < 17) {
    return { backgroundColor: "#fef9c3" }; // Day - bright yellow
  } else if (hour >= 17 && hour < 19) {
    return { backgroundColor: "#fde68a" }; // Evening - soft orange
  } else {
    return { backgroundColor: "#c7d2fe" }; // Night - cool blue
  }
}

export default function Forecast({ cityName, apiKey, steps = 6 }) {
  const [forecastData, setForecastData] = useState(null);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [forecastError, setForecastError] = useState(null);

  useEffect(() => {
    if (!cityName) return;

    setLoadingForecast(true);
    setForecastError(null);

    const url = `http://127.0.0.1:5000/forecast-auto?appid=${apiKey}&city_name=${encodeURIComponent(cityName)}&steps=${steps}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        if (!data.forecast || !Array.isArray(data.forecast)) {
          throw new Error("Invalid forecast data from API.");
        }
        setForecastData(data.forecast);
      })
      .catch(err => {
        setForecastError(`Failed to fetch forecast: ${err.message}`);
        setForecastData(null);
      })
      .finally(() => setLoadingForecast(false));
  }, [cityName, apiKey, steps]);

  if (loadingForecast) return <p>Loading forecast for “{cityName}”…</p>;
  if (forecastError) return <p className="error">Error: {forecastError}</p>;
  if (!forecastData || forecastData.length === 0) return <p>No forecast data available.</p>;

  return (
    <div className="center">
      <div className="heading">
        <h3>Forecast for {cityName}</h3>
        <div className="view-type">
          <Clock size={16} />
          <p>Next {steps} hours</p>
        </div>
      </div>

      <div className="main-sec">
        {forecastData.map(({ datetime, predicted_temperature }, idx) => {
          const date = new Date(datetime);
          const hour = date.getHours();
          const timeLabel = idx === 0
            ? "Now"
            : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

          const Icon = getWeatherIcon(hour);
          const cardStyle = getCardStyle(hour);

          return (
            <div key={idx} className="card" style={cardStyle}>
              <h4>{timeLabel}</h4>
              <Icon />
              <p>{Math.round(predicted_temperature)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Forecast.propTypes = {
  cityName: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  steps: PropTypes.number,
};
