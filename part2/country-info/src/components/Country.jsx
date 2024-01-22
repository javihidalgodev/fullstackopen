import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [visibility, setVisibility] = useState(false)
  const [weather, setWeather] = useState()

  const handleCountryState = () => {
    setVisibility(!visibility)
  }

  const weatherHook = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=${import.meta.env.VITE_API_KEY}`)
      .then(res => setWeather(res.data))
      .catch((e)=>{console.log(e.name)})
  }

  useEffect(weatherHook, [])

  // console.log(weather)
  return (
    <div>
      {country.name.common}
      <button onClick={handleCountryState}>
        {
          visibility
            ? 'hide'
            : 'show'
        }
      </button>

      {
        visibility
          && (
            <div className="country-info">
              <h1>{country.name.common}</h1>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <h3>Languages</h3>
              <ul>{
                Object.entries(country.languages).map(lang => <li key={lang[0]}>{lang[1]}</li>)
              }</ul>
              <img src={country.flags.png} alt="" />

              {
                weather && (
                  <div className='weather'>
                    <h3>Weather in {country.name.common}</h3>
                    <p>Temperature: {weather.main.temp}</p>
                    <p>State: {weather.weather[0].main}</p>
                  </div>
                ) 
              }
            </div>
          )
      }
      
    </div>
  )
}

export default Country