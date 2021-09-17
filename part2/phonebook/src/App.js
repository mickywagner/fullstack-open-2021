import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <label htmlFor="name">name:</label>
        <input id="name" value={newName} onChange={handleNameChange} />
        <label htmlFor="number">number: </label>
        <input id="number" value={newNumber} onChange={handleNumberChange} />
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={persons.indexOf(person)}>{person.name} {person.number}</div>
      ))}
    </div>
  );
};

export default App;
