import React, { useState } from "react";      // ← import useState
import Hero from "./Components/hero.jsx";
import Forecast from "./Components/forecast.jsx";
import { Outfit } from "./Components/Outfit.jsx";
import { Advice } from "./Components/Advice.jsx";

function App() {
  const [cityName, setCityName] = useState("Dehradun");  // works now

  return (
    <>
      <Hero onCityChange={setCityName} />
      {/* pass cityName, not city */}
      <Forecast
        cityName={cityName}
        apiKey={"1f5ad950fdb8a96926432578e5fcdf59"}
        steps={6}
      />
      <Outfit />
      <Advice />
    </>
  );
}

export default App;
