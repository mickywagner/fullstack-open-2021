import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";


function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState(null)

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

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(`Note "${note.content}" was alredy removed from the server`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note.id !== id));
      });
  };

  let notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div className="App">
      <h1>Note Keeper</h1>
      <form onSubmit={addNewNote}>
        <label htmlFor="new">New note: </label>
        <input
          id="new"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
      <Notification message={errorMessage} />
      <div className="noteDisplay">
        <button className="importantBtn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show important" : "Show All"}
        </button>
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
      <Footer />
    </div>
  );
}

export default App;
