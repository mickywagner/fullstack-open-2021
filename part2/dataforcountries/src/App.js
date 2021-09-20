import React, { useState, useEffect } from "react";
import axios from "axios";

import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryToShow, setCountryToShow] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      const countryData = response.data;
      setCountries(countryData);
    });
  }, []);

  const doSearch = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value);
    let countryArray = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCountryToShow(countryArray);
  };

  let displayNames = () => {
    if (countryToShow.length === 1) {
      return <Country country={countryToShow[0]} />;
    } else if (countryToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return countryToShow.map((country) => (
        <div key={country.numericCode}>
          {country.name}{" "}
          <button onClick={() => setCountryToShow([country])}>Show</button>
        </div>
      ));
    }
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="search">find countries: </label>
        <input id="search" onChange={doSearch} value={searchTerm} />
      </form>
      {countries.length > 0 ? displayNames() : "loading data..."}
    </div>
  );
}

export default App;
