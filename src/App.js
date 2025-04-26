import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // 🔥 We'll add nice CSS here

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = "4f611166b9c67d02e549ca2a2d39caa5"; // ✅ Your API key

  const handleSearch = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      alert('City not found! Please try again.');
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🌤️ Weather App</h1>
      <div className="search">
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button onClick={handleSearch} className="button">Get Weather</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Condition:</strong> {weather.weather[0].main}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
