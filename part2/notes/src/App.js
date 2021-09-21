import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNewNote = (e) => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    }).catch(error => {
      alert(`The note "${note.content}" was already deleted`)
      setNotes(notes.filter(note.id !== id));
    });
  };

  let notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div className="App">
      <form onSubmit={addNewNote}>
        <label htmlFor="new">Note: </label>
        <input
          id="new"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          required
        />
        <button type="submit">add</button>
      </form>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show important" : "Show All"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
