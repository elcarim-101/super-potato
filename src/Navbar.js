import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logoImg from './250.jpg';

const NavBar = () => {
  return (
    <nav className="navbar">
        <div className="logo-container">
            <img src={logoImg} alt="Logo" className="navbar-logo" />
            <h1 className="navbar-title">WeatherPrep</h1>
        </div>
      <ul className="navbar-links">
        <li>
         <p><Link to="/">Home</Link></p> 
        </li>
        <li>
         <p><Link to="/forecast">Forecast</Link></p> 
        </li>
        <li>
         <p><Link to="/weathermaps">WeatherMaps</Link></p> 
        </li>
        <li>
        <p><Link to="/alerts">Alerts</Link></p>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;