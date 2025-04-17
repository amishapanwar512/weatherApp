import {useState,useEffect} from "react";
import { fetchWeatherData } from "./weatherService";

export const useWeatherData=(location)=>{
    const [data, setData]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{
        if(!location) return;

        const getData=async()=>{
            try{
                const result = await fetchWeatherData(location);
                setData(result);
            }catch(err){
                setError(err);
            }finally{
                setLoading(false);
            }
        };

        getData();
    },[location]);

    return {data,loading,error};
}