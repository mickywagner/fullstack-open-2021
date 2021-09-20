import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [current, setCurrent] = useState([]);

  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      )
      .then((response) => {
        let currentWeather = response.data;
        setCurrent(currentWeather.current);
      });
  }, [api_key, capital]);

  return (
    <>
      <h2>Weather in {capital}</h2>
      {current ? (
        <>
          <div className="weather-icon">
            <img alt="Weather icon" src={current.weather_icons} />
          </div>
          <p>Temperature: {current.temperature} Celcius</p>
          <p>
            Wind: {current.wind_speed} km/hour, direction {current.wind_dir}
          </p>
        </>
      ) : (
        <div>Sorry no data available</div>
      )}
    </>
  );
};

export default Weather;
