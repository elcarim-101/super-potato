import React from 'react';
import Navbar from './Navbar'; 
import weatherimage from './pic1.jpg';
import image from './pic2.jpg';
import map from './pic3.jpg';
import maps from './pic4.jpg';
import './Home.css'

const WeatherMaps = () => {
  return (
    <div>
      <Navbar />
      <header className="header">
        <h1>Weather Maps</h1>
      </header>
      <div className='weather-pics'>
        <div className='pic-container'>
          <img src={weatherimage} className="weather-pic" alt="Weather visualization" />
        </div>
        <div className='pic-container'>
          <img src={image} className="weather-pic" alt="Weather data" />
        </div>
        <div className='pic-container'>
          <img src={map} className="weather-pic" alt="Weather map" />
        </div>
        <div className='pic-container'>
          <img src={maps} className="weather-pic" alt="Weather forecast" />
        </div>
      </div>
      <footer className="footer">
        <p>Contact us at <a href="mailto:info@weathermaps.com">info@weathermaps.com</a></p>
      </footer>
    </div>
  )
}

export default WeatherMaps;