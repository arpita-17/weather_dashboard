import React from 'react';

function WeatherDisplay({ weatherData, forecastData }) {
  return (
    <div>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
      <h3>5-Day Forecast</h3>
      <div>
        {forecastData.map((forecast, index) => (
          <div key={index}>
            <p>{forecast.dt_txt}</p>
            <p>{forecast.main.temp}°</p>
            <p>{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;
