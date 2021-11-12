import React from "react";
import { Icon } from 'semantic-ui-react'

const Note = ({ note, toggleImportance }) => {
  let label = note.important ? "Make not important" : "Make important";

  let btnStyle = note.important ? { background: "#E3170A", color: "white" } : { background: "#A9E5BB"}

  return (
    <>
      <li>
        {note.content} 
        <span> 
          <button style={btnStyle} onClick={toggleImportance}>{label}</button>
          <button><Icon name='trash' /></button> 
        </span>
      </li>
    </>
  );
};

export default Note;
