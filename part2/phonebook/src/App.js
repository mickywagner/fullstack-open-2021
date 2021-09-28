import { useState, useEffect } from "react";
import contactService from "./services/contacts";

import Persons from "./components/Persons";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [message, setMessage] = useState(null)

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  useEffect(() => {
    setFilteredList(persons);
  }, [persons]);

  const deleteContact = (id) => {
    const contact = persons.find((p) => p.id === id);
    const confirmation = window.confirm(
      `Are you sure you want to delete ${contact.name} from the phonebook?`
    );

    if (confirmation) {
      contactService
        .remove(id)
        .then(setPersons(persons.filter((p) => p.id !== id)))
        .catch((error) => {
          alert("Unable to delete::", error);
        });
    }
  };

  const searchFilter = (value) => {
    setFilteredList(
      persons.filter((person) =>
        person.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter searchFilter={searchFilter} />

      <h2>Add new number</h2>

      <Form persons={persons} setPersons={setPersons} setMessage={setMessage}/>

      <h2>Numbers</h2>

      <Persons persons={filteredList} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
