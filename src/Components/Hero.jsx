import React, { useEffect, useState } from "react";
import {
    Sun,
    Cloud,
    CloudRain,
    Moon,
    MapPin,
    Menu,
    Search,
    Calendar,
    Clock,
    Umbrella,
    Wind,
    Droplets,
    MapPinIcon,
    Rabbit
} from "lucide-react";
import "./hero.css";
import { useWeatherData } from "./useWeatherData";


export default function Hero({ onCityChange, onWeatherChange}) {
    const [location, setLocation] = useState("Dehradun");
    const [searchTerm, setSearchTerm] = useState("");
    const { data, loading, error } = useWeatherData(location);

    useEffect(() => {
        if (data) {
            const weatherDescription = data.weather?.[0]?.description;
            onWeatherChange(weatherDescription);
        }
    }, [data, onWeatherChange]);
    
    //Handle search box in smaller screens
    const [showSearch, setShowSearch] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        const formatted =
            searchTerm.trim().charAt(0).toUpperCase() +
            searchTerm.trim().slice(1).toLowerCase();

        setLocation(formatted);
        onCityChange(formatted);
        setSearchTerm("");
    };

    // Function to determine day or night
    function isDaytime(dt, sunrise, sunset) {
        return dt >= sunrise && dt < sunset;
    }

    // Handle error state
    if (data?.message === "city not found" || error) {
        return (
            <div
                className="box1"
                style={{
                    background: "linear-gradient(to bottom, #f87171, #fbbf24, #fef3c7)"
                }}
            >
                <div className="top">
                    <div className="logo">
                        <Rabbit size={36} />
                        <p>CloudyBuddy</p>
                    </div>
                    <div className="search">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Enter city name"
                            />
                            <button type="submit">
                                <Search />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="middle">
                    <p style={{ color: "white", fontSize: "1.2rem", marginTop: "20px" }}>
                        City not found. Please try a valid city name.
                    </p>
                </div>
            </div>
        );
    }

    // Handle loading state
    if (loading || !data) return <div>Loading...</div>;

    const dt = data?.dt;
    const sunrise = data?.sys?.sunrise;
    const sunset = data?.sys?.sunset;
    const result = isDaytime(dt, sunrise, sunset);
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`;



    return (
        <div
            className="box1"
            style={{
                background: result
                    ? "linear-gradient(to bottom, #bfdbfe, #e9d5ff, #fbcfe8)" // Day
                    : "linear-gradient(to bottom, #910A67, #3C0753, #030637)" // Night
            }}
        >
            <div className="top">
                <div className="logo">
                    <img src="/icons/cloud.png" alt="logo" className="logo-icon" style={{
                        height: "40px",
                        width: "40px",
                    }}/>
                    <p style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: result ? "#000" : "#fff",
                    }}>CloudyBuddy</p>
                </div>
                <div className="city">
                    <MapPinIcon />
                    <p>
                        {data.name}, {data.sys?.country}
                    </p>
                </div>
                <div className="search">
                    <form onSubmit={handleSearch}

                    >
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter city name"
                            style={{ visibility: showSearch ? "visible" : "hidden" }}
                        />
                        <button type="submit" onClick={() => setShowSearch(!showSearch)}>
                            <Search />
                        </button>
                    </form>
                </div>
            </div>

            <div className="middle">
                <div className="temp-icon">
                    <img src={iconUrl} alt="weather icon" />
                </div>
                <div className="temp">
                    <p>{data.main?.temp}&deg;C</p>
                </div>
                <div className="temp-day">{data.weather?.[0]?.description}</div>
                <div className="feels-like">
                    <p>Feels like {data.main?.feels_like}&deg;C</p>
                </div>
            </div>

            <div className="bottom">
                <div className="wind">
                    <Wind />
                    <p>{data.wind?.speed} mph</p>
                </div>
                <div className="humidity">
                    <Droplets />
                    <p>{data.main?.humidity}%</p>
                </div>
                <div className="rain">
                    <Umbrella />
                    <p>{data.clouds?.all}%</p>
                </div>
            </div>
        </div>
    );
}
