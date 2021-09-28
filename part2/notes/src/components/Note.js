import React from "react";

const Note = ({ note, toggleImportance }) => {
  let label = note.important ? "Make not important" : "Make important";

  let btnStyle = note.important ? { background: "#E3170A", color: "white" } : { background: "#A9E5BB"}

  return (
    <>
      <li>
        {note.content} <button style={btnStyle} onClick={toggleImportance}>{label}</button>
      </li>
    </>
  );
};

export default Note;
