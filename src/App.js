import logo from './logo.svg';
import './index.css';
import Home from './Home';
import Forecast from './Forecast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import WeatherMaps from './WeatherMaps';
import Alerts from './Alerts';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          {/* Correct way to define routes in React Router v6 */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forecast" element={<Forecast/>} />
          <Route path="/weathermaps" element={<WeatherMaps />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;