import React from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  const altText = `Flag of ${country.name}`

  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h2>Languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={country.languages.indexOf(lang)}>{lang.name}</li>
        ))}
      </ul>
      <div className="flag">
        <img alt={altText} src={country.flag} />
      </div>
      <Weather capital={country.capital} name={country.name}/>
    </>
  );
};

export default Country;
