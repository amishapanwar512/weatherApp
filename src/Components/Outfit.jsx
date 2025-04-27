import React, { useEffect, useState } from "react";
import './Outfit.css';
import { outfit } from './outfitData.jsx';

export const Outfit = ({ weatherDescription }) => {
    const [currentOutfit, setCurrentOutfit] = useState(outfit.default);

    useEffect(() => {
        if (weatherDescription) {
            const weather = weatherDescription.toLowerCase();

            if (weather.includes("cloud")) {
                setCurrentOutfit(outfit.clouds);
            } else if (weather.includes("clear")) {
                setCurrentOutfit(outfit.clear);
            } else if (weather.includes("rain")) {
                setCurrentOutfit(outfit.rain);
            } else if (weather.includes("snow")) {
                setCurrentOutfit(outfit.snow);
            } else if (weather.includes("mist")) {
                setCurrentOutfit(outfit.mist);
            } else {
                setCurrentOutfit(outfit.default);
            }
        }
    }, [weatherDescription]); // Run when weatherDescription changes

    return (
        <div className="outfit-main">
            <div className="outfit">
                <div className="heading">
                    <img src="/icons/knitting.png" alt="knitting icon" className="icon-knit" />
                    <h2>Today's Outfit Vibes</h2>
                </div>
                <div className="outfit-container">
                    <div className="picture">
                        <img src={currentOutfit.icon} alt={currentOutfit.name} className="icon-cardigan" />
                    </div>
                    <div className="cloth-description">
                        <h3>{currentOutfit.name}</h3>
                        <p>{currentOutfit.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
