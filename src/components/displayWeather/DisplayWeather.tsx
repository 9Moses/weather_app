import React from "react";
import { FaSearchLocation } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import {
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
  BsFillSunFill,
} from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { fetchCurrentWeather, fetchWeatherData } from "../api/api";
import { WeatherDataProps } from "../interface/interface";

export const DisplayWeather = () => {
  const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(
    null
  );

  const [isLoading, setIsLoading] = React.useState(false);

  const [searchCity, setSearchCity] = React.useState("");

  const handleSearch = async () => {
    if (searchCity.trim() === "") {
      return;
    }
    try {
      const { currentWeatherData } = await fetchWeatherData(searchCity);
      setWeatherData(currentWeatherData);
    } catch (error) {
      console.error("No Result Found");
    }
  };

  const iconChanger = (weather: string) => {
    let iconELement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconELement = <BsFillCloudRainFill />;
        iconColor = "#272829";
        break;
      case "Clear":
        iconELement = <BsFillSunFill />;
        iconColor = "#FFC436";
        break;
      case "Clouds":
        iconELement = <BsCloudyFill />;
        iconColor = "#1023c57";
        break;
      case "Mist":
        iconELement = <BsCloudFog2Fill />;
        iconColor = "#279eff";
        break;

      default:
        iconELement = <TiWeatherPartlySunny />;
        iconColor = "#7e2869";
        break;
    }

    return (
      <span className="text-[100px]" style={{ color: iconColor }}>
        {iconELement}
      </span>
    );
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather);
          setIsLoading(true);
        }
      );
    });
  });
  return (
    <div className="">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex flex-col p-4 justify-center items-center w-full max-w-md mx-auto border rounded-lg">
        <div className="search flex items-center justify-center w-full px-6">
          <input
            type="text"
            placeholder="Enter a city"
            className="p-2 border rounded-full w-full"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <div className="icon">
            <FaSearchLocation
              size={23}
              className="mx-2"
              onClick={handleSearch}
            />
          </div>
        </div>

        {weatherData && isLoading ? (
          <>
            <div className="weather mt-2 text-center">
              <h1 className="text-3xl font-bold">{weatherData.name}</h1>
              <span className="text-sm">{weatherData.sys.country}</span>
              <div className="icon my-5 flex justify-center items-center">
                {iconChanger(weatherData.weather[0].main)}
              </div>
              <h1 className="text-2xl font-bold ">{weatherData.main.temp}</h1>
              <h2 className="text-xl">{weatherData.weather[0].main}</h2>
            </div>

            <div className="info flex justify-between items-center py-2 bg-slate-400 border rounded-[10px] gap-2 w-full my-2">
              <div className="humidityLevel flex justify-center items-center mx-4">
                <WiHumidity size={24} />
                <div className="humidityInfo">
                  <h1 className="text-2xl font-bold">
                    {weatherData.main.humidity}%
                  </h1>
                  <p className="text-[12px]">Humidity</p>
                </div>
              </div>
              <div className="wind flex justify-center items-center mx-4">
                <FiWind size={24} />
                <div className="humidityInfo">
                  <h1 className="text-2xl font-bold">
                    {weatherData.wind.speed} km/h
                  </h1>
                  <p className="text-[12px]">Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-[400px] w-[300px] flex flex-col justify-center items-center z-50">
            <RiLoaderFill className="text-[48px] animate-spin" />
            <p className="text-[22px] mt-2">Loading</p>
          </div>
        )}
      </div>
    </div>
  );
};
