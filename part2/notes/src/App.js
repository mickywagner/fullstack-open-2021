import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);


  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      const notes = response.data;
      setNotes(notes);
    })
  }, []);

  let notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div className="App">
      <form>
        <label htmlFor="new">Note: </label>
        <input id="new" />
        <button type="submit">add</button>
      </form>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show important" : "Show All"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
}

export default App;
