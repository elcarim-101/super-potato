import React, { useState, useEffect } from 'react';
import './App.js';
import index from './index.css';
import './Home.css';
import rain from './icons8-rain.gif';
import Navbar from './Navbar'
import logo from './250.jpg';

    
const Home = () => {
  return(
  <div className='home-content'>
    <Navbar />
    <div className='logo'>
          <img src={logo} className="logo" alt="home-logo" />   
        </div>
        

    <div>
        <p>Welcome to WeatherPrep!!</p>
        <p>Here, you'll be the first to know about anything as far as weather is concerned
          <p>Remember to use the navbar if you are in search of anything</p>
          <p>We're glad to have you and we do hope you enjoy the time you spend with us</p>
        </p>
        </div>
        <div className="footer">
        <p>Weather data provided by OpenWeatherMap</p>
        <p>Contact us at miracle.benice521@gmail.com</p>
      </div>
      </div>
  
    

);
};

export default Home;