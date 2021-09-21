import React from "react";

const Note = ({ note, toggleImportance }) => {
  let label = note.important ? "Make not important" : "Make important";

  return (
    <>
      <li>
        {note.content} <button onClick={toggleImportance}>{label}</button>
      </li>
    </>
  );
};

export default Note;
