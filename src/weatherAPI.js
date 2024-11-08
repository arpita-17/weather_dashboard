// src/weatherAPI.js
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const getWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    return null;
  }
};

export const getForecastData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast data: ", error);
    return null;
  }
};
