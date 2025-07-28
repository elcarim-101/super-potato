import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logoImg from './250.jpg';

const NavBar = () => {
  return (
    <nav className="navbar">
        <div>
            <img src={logoImg} alt="Logo" className="navbar-logo" />
            <h1 className="navbar-title">WeatherPrep</h1>
        </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/forecast">Forecast</Link>
        </li>
        <li>
          <Link to="/weathermaps">WeatherMaps</Link>
        </li>
        <li>
          <Link to="/alerts">Alerts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;