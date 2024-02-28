import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";

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

/**
 * 
 * @param {{weather: weatherData}} param0 
 * @returns {JSX.Element}
 */
export const WeatherCard = ({ weather }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold md:text-4xl sm:text-xl flex justify-center">{weather.location}</h1>
      <Card>
        <CardBody className="flex flex-col gap-3">
          <Image src={weather.icon} alt={weather.condition} />
          <div className="flex flex-col">
            <div className="flex justify-between font-semibold ">
              <h6 >Temperature :</h6>
              <p>{weather.temp}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <h6 >Condition :</h6>
              <p>{weather.condition}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <h6 >Wind Speed :</h6>
              <p>{weather.windspeed}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <h6 >Humidity :</h6>
              <p>{weather.humidity}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <h6 >Cloud Coverage :</h6>
              <p>{weather.cloud}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <h6 >Last Update :</h6>
              <p>{weather.last_update}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
