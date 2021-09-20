import { useState, useEffect } from "react";
import axios from "axios";

import Persons from "./components/Persons";
import Form from "./components/Form";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  let filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const personData = response.data;
      setPersons(personData);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add new number</h2>

      <Form persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>

      <Persons persons={filteredList} />
    </div>
  );
};

export default App;
