import React, { useState, useEffect } from "react";
import './advice.css';
import { advice } from "./adviceData";

export const Advice = ({ weatherDescription }) => {
    const [currentAdvice, setCurrentAdvice] = useState(advice.default);

    useEffect(() => {
        if (weatherDescription) {
            const weather = weatherDescription.toLowerCase();

        if (weather.includes('cloud')) {
            setCurrentAdvice(advice.clouds);
        } else if (weather.includes('rain')) {
            setCurrentAdvice(advice.rain);
        } else if (weather.includes('mist')) {
            setCurrentAdvice(advice.mist);
        } else if (weather.includes('clear')) {
            setCurrentAdvice(advice.clear);
        } else if (weather.includes('snow')) {
            setCurrentAdvice(advice.snow);
        } else {
            setCurrentAdvice(advice.default);
        }}
    }, [weatherDescription]);

    return (
        <div className="advice-main">
            <div className="advice-box">
                <div className="heading-section">
                    <img src="/icons/idea.png" className="idea-icon" />
                    <p>CloudyBuddy says...</p>
                </div>
                <div className="advice-container">
                    <img src={currentAdvice.icon} className="umbrella-icon" />
                    <p><b>{currentAdvice.name}</b><br></br>{currentAdvice.description}</p>
                </div>
                <div className="advice-footer">
                    <p>All set for the day!</p>
                </div>
            </div>
        </div>
    );
}
