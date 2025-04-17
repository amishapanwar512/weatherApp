import React from "react";
import './center.css';
import { Sun, Cloud, CloudRain, Moon, MapPin, Menu, Search, Calendar, Clock, Umbrella, Wind, Droplets, MapPinIcon, Rabbit } from 'lucide-react';
import { getWeatherIcon } from "./weatherIcon";
import { useWeatherData } from "./useWeatherData";

export default function Center() {
    // const {data,loading,error}=useWeatherData(location)
    // const hourlyData = data.forecast.forecastday[0].hour;

    // const alternateHours=hourlyData.filter((_, index)=> index%2 == 0);

    // const extractedData=alternateHours.map(hours =>({
    //     time: hour.time,
    //     temp_c:hour.time
    // }))
    return <>
        <div className="center">
            <div className="heading">
                <h3>Todays's Forecast</h3>
                <div className="view-type">
                    <Clock size={16} />
                    <p>Hourly view</p>
                </div>
            </div>
            <div className="main-sec">
                <div className="card">
                    <h4>Now</h4>
                    <Sun />
                    <p>72 &deg;</p>
                </div>

            </div>
        </div>

    </>
}