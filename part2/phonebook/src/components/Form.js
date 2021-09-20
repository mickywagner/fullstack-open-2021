import React, { useState } from "react";

const Form = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const checkDuplicateEntry = (name) => {
    return persons.findIndex((person) => person.name === name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkDuplicateEntry(newName) > -1) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      let newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name: </label>
          <input
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input
            id="number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            type="tel"
            required
          />
        </div>

        <button type="submit">add</button>
      </form>
    </>
  );
};

export default Form;
