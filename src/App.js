import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Favorites from './components/Favorites';

function App() {
  const [currentCity, setCurrentCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  const API_KEY = 'bef6766acce6749d923a52dfcef6c165';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  useEffect(() => {
    // Fetch favorite cities from JSON Server on initial load
    axios.get('http://localhost:5000/favorites').then((res) => setFavorites(res.data));
  }, []);

  // Fetch current weather and 5-day forecast
  const fetchWeather = async (city) => {
    const currentWeather = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: isCelsius ? 'metric' : 'imperial' },
    });
    const forecast = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: isCelsius ? 'metric' : 'imperial' },
    });
    setWeatherData(currentWeather.data);
    setForecastData(forecast.data.list);
  };

  const toggleUnit = () => setIsCelsius(!isCelsius);

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <button onClick={toggleUnit}>
        Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </button>
      <Search onSearch={(city) => { setCurrentCity(city); fetchWeather(city); }} />
      <WeatherDisplay weatherData={weatherData} forecastData={forecastData} />
      <Favorites
        favorites={favorites}
        setFavorites={setFavorites}
        fetchWeather={fetchWeather}
      />
    </div>
  );
}

export default App;
