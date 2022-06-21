import { useEffect, useState } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

function Country({ country }) {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map((language) => {
          return <li>{language}</li>
        })}
      </ul>
      <img src={country.flags.png} alt='flag' />
    </div>)
}

function Weather({ capital }) {
  const [capitalWeather, setCapitalWeather] = useState({})
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
      .then((response) => {
        return response.data
      })
      .then((data) => {
        setCapitalWeather(data)
      })
  }, [])
  
  return (
    <div>
      <h2>Weather in {capital}</h2>
      {capitalWeather.main ? <p>Temperature {capitalWeather.main.temp} celsius</p>: null}
      {capitalWeather.weather ? <img src={`http://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`} /> : null}
      {capitalWeather.weather ? <p>{capitalWeather.weather[0].description}</p> : null}
    </div>
  )
}

function Countries({ countries, setFilter }) {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>
  }
  if (countries.length !== 1) {
    return countries.map((country) => {
      return (
        <div>
          {country.name.common}
          <button onClick={() => { setFilter(country.name.common) }}>show</button>
        </div>
      )
    })
  }

  const country = countries[0]
  return (
    <div>
      <Country country={country} />
      <Weather capital={country.capital} />
    </div>
  )
}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (filter === '') return
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        return response.data
      })
      .then((data)=>{
        return data.filter((country) => {
          return country.name.common.toLowerCase().includes(filter.toLowerCase())
        })
      })
      .then((countriesFiltered)=>{
        setCountries(countriesFiltered)
      })
  }, [filter])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Find countries</h1>
      <input value={filter} onChange={handleFilter}></input>
      <Countries countries={countries} setFilter={setFilter} />
    </div>
  )
}

export default App;
