import axios from "axios";
import { VITE_WEATHER_API, VITE_WEATHER_KEY } from "../../weatherAPI";
import { WeatherDataProps } from "../interface/interface";

const api = VITE_WEATHER_API;
const key = VITE_WEATHER_KEY;

export const fetchCurrentWeather = async (lat: number, lon: number) => {
  const url = `${api}weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchWeatherData = async (city: string) => {
  try {
    const url = `${api}weather?q=${city}&appid=${key}&units=metric`;
    const searchResponse = await axios.get(url);

    const currentWeatherData: WeatherDataProps = searchResponse.data;
    return { currentWeatherData };
  } catch (error) {
    console.error("No Data Found");
    throw error;
  }
};
