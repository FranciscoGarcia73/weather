import React, {useState} from 'react';
import './App.css';
const api = {
  key: "215f31c8787c080f6245107118ea3dfa",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&lang=es&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(weather);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return`${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined")
      ? ((weather.name === "Madrid"))
        ? 'App madrid'
          :((weather.main.temp)>16)
          ? 'App warm'
        : 'App'
      : 'App'}>
      <main>
        <div className="search-box">
          <input
            type="text" className="search-bar" placeholder="Introduce Ciudad ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].description.toUpperCase()}</div>
            </div>
            <div className="tempMaxMin">
              <div className="tempMax">
                <p>Max</p>
                {Math.round(weather.main.temp_max)}°C
              </div>
              <div className="tempMin">
                <p>Min</p>
                {Math.round(weather.main.temp_min)}°C
              </div>
            </div>
            <div className="humidity">
              <p>Humedad relativa {Math.round(weather.main.humidity)}%</p>
            </div>
             <div className="pressure">
              <p>Presion atmosferica {Math.round(weather.main.pressure)}hPa</p>
            </div>
            <div className="coord">
              <div className="lat">
                <p>Latitud</p>
                {weather.coord.lat}
              </div>
              <div className="lon">
                <p>Longitud</p>
                {weather.coord.lon}
              </div>
            </div>
          </div>
        ):('')}
      </main>
    </div>
  );
}

export default App;
