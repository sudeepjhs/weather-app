import { Input } from "@nextui-org/react";
import { useState } from "react";
import { WeatherCard } from "./WeatherCard";


/**
 * @typedef {Object} weatherData
 * 
 * @property {string} location
 * @property {string} icon
 * @property {string} temp
 * @property {string} condition
 * @property {string} windspeed
 * @property {string} humidity
 * @property {string} cloud
 * @property {string} last_update
 */

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * 
 * @param {string} location 
 * @returns {Promise<weatherData | Error>}
 */
const fetchWeather = async (location) => {
  return fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${location}&aqi=no`).then((res) => {
    if (res.ok) return res.json()
    else throw new Error("No matching location found")
  }).then(data => {
    return {
      location: `${data.location.name} , ${data.location.country}`,
      icon: data.current.condition.icon,
      temp: `${data.current.temp_c}°C / ${data.current.temp_f}°F`,
      condition: data.current.condition.text,
      windspeed: `${data.current.wind_kph} km/h`,
      humidity: `${data.current.humidity}%`,
      cloud: `${data.current.cloud}%`,
      last_update: data.current.last_updated
    }
  }).catch(err => {
    throw err
  })
}



const Weather = () => {
  const [weather, setWeather] = useState({
    location: "",
    icon: "",
    temp: "",
    condition: "",
    windspeed: "",
    humidity: "",
    cloud: "",
    last_update: ""
  })
  const [error, setError] = useState("")

  const InputHandler = debounce((e) => {
    const { value } = e.target;
    if (value) fetchWeather(value).then((data) => {
      setWeather(() => data)
      setError(() => "")
    }).catch((err) => {
      setError(() => err.message)
    })
    else {
      setWeather(() => ({ cloud: "", condition: "", humidity: "", icon: "", last_update: "", location: "", temp: "", windspeed: "" }))
    }
    if (error && !value) setError(() => "")
  }, 1000)


  return (
    <div className="w-full  flex flex-col gap-4">
      <div className="flex justify-center">
        <div className=" md:w-2/4 sm:w-full p-4">
          <Input
            size="md"
            labelPlacement="outside"
            color="success"
            label="Enter Location"
            onChange={InputHandler}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" md:w-1/4 sm:w-3/4">
          {error ? <h3 className="text-danger-500">
            {error}
          </h3> :
            weather.location && <WeatherCard weather={weather} />}
        </div>
      </div>
    </div>
  );
};

export default Weather;
