import React from "react";
import './advice.css';

export const Advice=()=>{
    return <>
    <div className="advice-main">
    <div className="advice-box">
        <div className="heading-section">
            <img src="/icons/idea.png" className="idea-icon" />
            <p>CloudyBuddy says...</p>
        </div>
        <div className="advice-container">
            <img src="/icons/umbrella.png" className="umbrella-icon" />
            <p>Don't forget your umbrella, puddle-jumper! Splash with style!</p>
        </div>
        <div className="advice-footer">
            <p>You'll look amazing today!</p>
        </div>
    </div>
    </div>
    </>
}
