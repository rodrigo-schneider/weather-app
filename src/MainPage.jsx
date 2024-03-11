import { useState } from 'react'
import { getWeatherDescription } from './Helpers'
import axios from 'axios'
import './main.css'

import search_icon from "./Assets/search.png"

function App() {

  const [data, setData] = useState("");
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7773b59eeb23ebdab8a0b5da9d67b324&units=metric&lang=pt_br`;

  const handleChange = (e) => {
    setLocation(e.target.value);
  }

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data)
    })
    setLocation('');
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  }

  return (
    <>
      <div className='container'>
        <h1>Weather App</h1>
        <div className='input-container'>
          <input
            type="text"
            placeholder="Ex.: Florianópolis"
            value={location}
            onChange={handleChange}
            onKeyPress={handleKeyPress} />
          <button onClick={searchLocation}><img src={search_icon} alt="Search icon" className='search-icon' /></button>
        </div>
        <div className='search-result'>
          <p>{data.name}</p>
          {data.main ? <p>Temperatura: {(data.main.temp).toFixed()}°C</p> : null}
          <div className='weather-description'>
            {data.weather && <p>{getWeatherDescription(data.weather[0].description)}</p>}
            {data.weather ? <p><img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather icon" /></p> : null}
          </div>
          {data.wind ? <p>Vento: {(data.wind.speed).toFixed()}km/h</p> : null}
          {data.main ? <p>Humidade: {(data.main.humidity)}%</p> : null}
        </div>
      </div>
    </>
  )

}

export default App
