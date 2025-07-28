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
    <>
    {loading ? <div className='onboarding' alt="onboarding"><img src={rain} className="rain" alt="rain" /></div>:(<Navbar />
        
    )}
    
    </>
    
  );
};

export default WeatherApp;