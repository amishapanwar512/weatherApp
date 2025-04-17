import { Sun, Cloud, CloudRain, Moon, MapPin, Menu, Search, Calendar, Clock, Umbrella, Wind, Droplets, MapPinIcon, Rabbit } from 'lucide-react';

export  function getWeatherIcon(code, isDay) {
    switch (code) {
        // case 1000:
        //     return isDay ? Sun : Moon;


        // Partly cloudy
        case 1003:
        case 1006:
        case 1009:
            return Cloud;

        // Light drizzle
        case 1150:
        case 1153:
        case 1168:
        case 1171:
            return Drizzle;

        // Rain
        case 1180:
        case 1183:
        case 1186:
        case 1189:
        case 1192:
        case 1195:
            return CloudRain;

        // Snow
        case 1210:
        case 1213:
        case 1216:
        case 1219:
        case 1222:
        case 1225:
            return CloudSnow;

        // Thunder
        case 1273:
        case 1276:
        case 1279:
        case 1282:
            return Thunderstorm;

        // Fallback
        default:
            return isDay ? Sun : Moon;
    }
}