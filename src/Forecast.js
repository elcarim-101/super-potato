import React, { useState, useEffect } from 'react';
import './App.js';
import index from './index.css';
import './Home.css';
import rain from './icons8-rain.gif';
import Navbar from './Navbar';  

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Replace with your OpenWeatherMap API key
  const API_KEY = 'a9e07c63b7948093186bf1a566852004';
  
  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
      
      // Fetch forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeatherData(location);
    }
  };
  
  // Get user's location weather on initial load
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLoading(true);
        
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await response.json();
          setWeatherData(data);
          setLocation(data.name);
          
          // Fetch forecast for current location
          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const forecastData = await forecastResponse.json();
          setForecastData(forecastData);
        } catch (err) {
          setError('Failed to fetch weather for your location');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        // Default to a popular city if geolocation fails
        fetchWeatherData('London');
      }
    );
  }, []);
  
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };
  
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    
   
        <div className="weather-app">
        <Navbar />
      <header className="header">
        <h1>Weather Forecast</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit">Search</button>
        </form>
      </header>
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {weatherData && (
        <main>
          <section className="current-weather">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <div className="weather-main">
              <div className="weather-icon">
                <img 
                  src={getWeatherIcon(weatherData.weather[0].icon)} 
                  alt={weatherData.weather[0].description} 
                />
                <p>{weatherData.weather[0].main}</p>
              </div>
              <div className="weather-details">
                <div className="temperature">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <div className="details-grid">
                  <div>
                    <span>Feels like:</span>
                    <span>{Math.round(weatherData.main.feels_like)}°C</span>
                  </div>
                  <div>
                    <span>Humidity:</span>
                    <span>{weatherData.main.humidity}%</span>
                  </div>
                  <div>
                    <span>Wind:</span>
                    <span>{weatherData.wind.speed} m/s</span>
                  </div>
                  <div>
                    <span>Pressure:</span>
                    <span>{weatherData.main.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sun-times">
              <p>Sunrise: {formatTime(weatherData.sys.sunrise)}</p>
              <p>Sunset: {formatTime(weatherData.sys.sunset)}</p>
            </div>
          </section>
          
          {forecastData && (
            <section className="forecast">
              <h3>5-Day Forecast</h3>
              <div className="forecast-days">
                {forecastData.list.filter((item, index) => index % 8 === 0).map((day) => (
                  <div key={day.dt} className="forecast-day">
                    <p>{formatDate(day.dt)}</p>
                    <img 
                      src={getWeatherIcon(day.weather[0].icon)} 
                      alt={day.weather[0].description} 
                    />
                    <div className="forecast-temps">
                      <span className="max-temp">{Math.round(day.main.temp_max)}°</span>
                      <span className="min-temp">{Math.round(day.main.temp_min)}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      )}
      
      <div className="footer">
        <p>Weather data provided by OpenWeatherMap</p>
        <p>Contact us at miracle.benice521@gmail.com</p>
      </div>
    </div>
        
    
    
  );
};

export default WeatherApp;