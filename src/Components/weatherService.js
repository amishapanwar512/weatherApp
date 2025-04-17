// weatherService.js
export const fetchWeatherData = async (location) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    // Use backticks for template literals and encode the location
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    return response.json();
  };
