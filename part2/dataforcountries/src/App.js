import React, { useState, useEffect } from "react";
import axios from "axios";

import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      const countryData = response.data;

      setCountries(countryData);
    });
  }, []);

  let filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm)
  );

  let displayNames = () => {
    if (filteredCountries.length == 1) {
      return <Country country={filteredCountries[0]} />;
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return filteredCountries.map((country) => (
        <div key={country.numericCode}>{country.name}</div>
      ));
    }
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="search">find countries: </label>
        <input
          id="search"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          value={searchTerm}
        />
      </form>
      {displayNames()}
    </div>
  );
}

export default App;
