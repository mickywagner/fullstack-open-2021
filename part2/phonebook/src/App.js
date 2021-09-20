import { useState } from "react";
import Persons from "./components/Persons";
import Form from "./components/Form";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [filter, setFilter] = useState("");

  let filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add new number</h2>

      <Form persons={persons} setPersons={setPersons}/>

      <h2>Numbers</h2>

      <Persons persons={filteredList} />

    </div>
  );
};

export default App;
