import Country from "./Country"

const Countries = ({ countries }) => {
  if(countries.length > 10) {
    return <p>Demasiadas coincidencias; sea más específico</p>
  } else {
    if(countries.length === 1) {
      return (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>Capital: {countries[0].capital[0]}</p>
          <p>Population: {countries[0].population}</p>
          <h3>Languages</h3>
          <ul>{
            Object.entries(countries[0].languages).map(lang => <li key={lang[0]}>{lang[1]}</li>)
          }</ul>
          <img src={countries[0].flags.png} alt="" />
        </div>)
    } else {
      return (
        countries.map(c => <Country key={c.ccn3} country={c} />)
      )
    }
  }
}

export default Countries