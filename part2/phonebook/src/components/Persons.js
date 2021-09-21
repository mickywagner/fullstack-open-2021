import React from "react";

const Persons = ({ persons, deleteContact }) => {
  let phonebookEntries = persons.map((person) => (
      <div key={person.id}>
        {person.name} {person.number} {" "}
        <button onClick={() => deleteContact(person.id)}>Delete</button>
      </div>
    ));

  return <>{phonebookEntries}</>;
};

export default Persons;
