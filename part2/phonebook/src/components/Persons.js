import React from "react";
import { nanoid } from "nanoid";

const Persons = ({ persons }) => {
  let phonebookEntries = persons.map((person) => (
    <div key={nanoid()}>
      {person.name} {person.number}
    </div>
  ));

  return <>{phonebookEntries}</>;
};

export default Persons;
