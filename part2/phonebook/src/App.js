import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const checkDuplicateEntry = (name) => {
    return persons.findIndex((person) => person.name === name);
  };
  const addNewName = (e) => {
    e.preventDefault();

    if (checkDuplicateEntry(newName) > -1) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    let newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  let filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <label htmlFor="filter">Filter shown by name: </label>
      <input
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <h2>Add new number</h2>
      <form onSubmit={addNewName}>
        <div>
          <label htmlFor="name">name: </label>
          <input
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input
            id="number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>

      {filteredList.map((person) => (
        <div key={persons.indexOf(person)}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
