import React, { useState } from "react";
import contactService from "../services/contacts";

const Form = ({ persons, setPersons, setMessage, setNotificationType }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const checkDuplicateEntry = (name) => {
    return persons.findIndex(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkDuplicateEntry(newName) > -1) {
      const confirm = window.confirm(
        `"${newName}" is already in the phonebook, replace the old number with a new one?`
      );
      const contact = persons.find(
        (p) => p.name.toLowerCase() === newName.toLowerCase()
      );

      if (confirm) {
        contactService
          .update(contact.id, { ...contact, number: newNumber })
          .then((updatedInfo) => {
            setPersons(
              persons.map((p) => (p.id !== contact.id ? p : updatedInfo))
            );
            setMessage(`${contact.name}'s number was updated to ${newNumber}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(error => {
            setNotificationType("error");
            setMessage(`Information for ${newName} has already been removed from server.`);
          })
      }
    } else {
      let newPerson = { name: newName, number: newNumber };
      contactService.create(newPerson).then((newContact) => {
        setPersons(persons.concat(newContact));
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
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
