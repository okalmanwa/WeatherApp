import React, { useState } from 'react'
import './WeatherApp.css'
import axios from 'axios';

import search_icon from '../Assets/search.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import cloudy_icon from '../Assets/cloudy.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import clear_icon from '../Assets/clear-sky.png';
import rain_icon from '../Assets/rain_icon.png'


export default function WeatherApp() {
  const apiKey = '2a33c2a47ffb89c3400b8dc5ecc2c156';

  const [wicon, setWicon] = useState(cloudy_icon)

  const search = async () => {
    const element = document.getElementsByClassName('city-input');

    if (element[0].value === '') {
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
    let response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        // Show modal here
        showModal(":(", "The entered city could not be found. Please check the spelling and try again.");
        return;
      }
      // Handle other errors
      showModal("Error", "An unexpected error occurred. Please try again later.");
      return;
    }

    let data = await response.json();

    const humidity = document.getElementsByClassName('humidity-percent');
    const wind = document.getElementsByClassName('wind-rate');
    const temperature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-location');

    humidity[0].innerHTML = Math.floor(data.main.humidity) + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
    location[0].innerHTML = data.name;


    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon)
    }
    else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setWicon(cloudy_icon)
    }
    else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
      setWicon(drizzle_icon)
    }
    else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setWicon(drizzle_icon)
    }
    else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setWicon(rain_icon)
    }
    else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWicon(rain_icon)
    }
    else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWicon(snow_icon)
    }
    else {
      setWicon(clear_icon)
    }
  }

  // Function to show modal
  function showModal(title, message) {
    // Code to create and display modal with the given title and message
    // This can be a simple alert or a more complex modal dialog, depending on your UI framework
    alert(title + " " + message);
  }

  return (
    <div className="container">
       <div className="all-contents">
      <h2 style={{ color: 'white', textAlign: 'center', textTransform: 'uppercase', padding: '2%' }}>Weather App</h2>
      <div className="top-bar">
        <input
          type="text"
          className='city-input'
          placeholder='search city'
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              search();
            }
          }} />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="search Icon" />
        </div>
      </div>


      <div className="main-container">
        <div className="content-container">
          <div className="weather-image">
            <img src={wicon} alt="" />
          </div>
          <div className="weather-temp">
     
          </div>
          <div className="weather-location">
  
          </div>
          <div className="dataContainer">

            <div className="element">
              <div>
                <img src={wind_icon} className="icon" />
                <div className="text">Wind</div>


              </div>
              <div className="wind-rate"></div>


            </div>

            <div className="element">
              <div>
                <img src={humidity_icon} className="icon" />
                <div className="text">Humidity</div>
              </div>
              <div className="humidity-percent"></div>

            </div>
          </div>

        </div>

      </div>

      <div className="footer">
        <p>&copy;2023 Carey Okal</p>
      </div>

    </div>

    </div>
   
  )
}
