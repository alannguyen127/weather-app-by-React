import React, { useState, useEffect } from "react";

import "./App.css";

const api = {
  key: "7dbc2ac4f949e3c14adc570308c3e612",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date} ${year}`;
  }

  useEffect(() => {
    const now = new Date();
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(
            // JSON.stringify(data)
            <>
              <div className="location">
                <div className="city">
                  {data.name}, {data.sys.country}
                </div>
                <div className="date">{dateBuilder(now)}</div>
              </div>
              <div className="current">
                <div className="temp">
                  {data.main.temp}
                  <span>°C</span>
                </div>
                <div className="weather">{data.weather[0].description}</div>
                <div className="hi-low">
                  {data.main.temp_min}°C / {data.main.temp_max}°C
                </div>
              </div>
            </>
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <>
      <div id="container">
        <form onSubmit={handleSubmit} id="form-input">
          <input
            className="search-input"
            type="text"
            placeholder="Search for a city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </form>
        <div className="weather-info">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {errorMessage ? (
                <div className="error-msg">{errorMessage}</div>
              ) : (
                <div>{weatherInfo}</div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
