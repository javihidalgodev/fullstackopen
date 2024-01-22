import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState(false)

  const hook = (search) => {
    // console.log(search !== '')
    if(search !== '') {
      error && setError(false)
      axios
      .get(`https://restcountries.com/v3.1/name/${search}`)
      .then(res => {
        console.log(res.data)

        setCountries(res.data)
      }).catch((e)=> setError(true))
    }
  }

  // useEffect(hook, [])

  const handleSearch = (e) => {
    const newSearch = e.target.value 
    setSearch(newSearch)
    setTimeout(hook(newSearch), 2000)
  }

  return (
    <>
      <div>
        Find countries <input type="text" value={search} onChange={handleSearch} />

        {
          error
            ? <p>No se han encontrado países</p>
            : <Countries countries={countries} />
        }
      </div>
    </>
  )
}

export default App
