// src/api/geocode.js
export const fetchCoordsForCity=async(cityName, apiKey)=> {
    const url = new URL("https://api.openweathermap.org/geo/1.0/direct");
    url.searchParams.set("q", cityName);
    url.searchParams.set("limit", "1");
    url.searchParams.set("appid", apiKey);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocode error ${res.status}`);
    const data = await res.json();
    if (!data.length) throw new Error("City not found");
    return {
      lat: data[0].lat,
      lon: data[0].lon
    };
  }
