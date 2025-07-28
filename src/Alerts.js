import React from 'react';
import './Home.css';        
import Navbar from './Navbar'; 
import alerts from './wind.jpg';
import alert from './lightening.jpg';


const Alerts = () => {
  return (
    <div>
      <Navbar />
      <header className="header">
        <h1>Weather Alerts</h1>
      </header>
      <div className='weather-pics'>
        <div className='pic-container'>
          <img src={alerts} className="weather-pic" alt="Weather visualization" />
        </div>
        <div className='pic-container'>
          <img src={alert} className="weather-pic" alt="Weather data" />
        </div>
      </div>
      <footer className="footer">
        <p>Find out more at<a href="https://weather.com/en-CM/weather/today/l/CMXX0008:1:CM?Goto=Redirected"> weather alerts</a></p>
        <p>Contact us at <a href="mailto:info@weathermaps.com">info@weathermaps.com</a></p>
      </footer>
    </div>
  )
}

export default Alerts;