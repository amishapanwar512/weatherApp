import React from "react";
import './Outfit.css';

export const Outfit=()=>{
    return(
        <div className="outfit-main">
        <div className="outfit">
            <div className="heading">
                <img src="/icons/knitting.png"  alt="knitting icon" className="icon-knit"/>
                <h2>Today's Outfit Vibes</h2>
            </div>
            <div className="outfit-container">
                <div className="picture">
                <img src="/icons/cardigan.png" alt="cardigan" className="icon-cardigan
                "/>
                </div>
                <div className="cloth-description">
                    <h3>Cardigan</h3>
                    <p>Perfect for layering and keeping warm.</p>
                </div>
            </div>
        </div>
    </div>
    )
}