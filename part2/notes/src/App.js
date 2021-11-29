import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import loginService from "./services/login"

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ user, setUser ] = useState(null)

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
        setErrorMessage(
          `Note "${note.content}" was alredy removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(note.id !== id));
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const user = await loginService.login({
        username, password
      })

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">
            username
            <input
              id="username"
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            password
            <input
              id="password"
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
  )

  const noteForm = () => (
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
  )

  let notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div className="App">
      <h1>Note Keeper</h1>

      <Notification message={errorMessage} />

      { user === null ? 
        loginForm() : 
        <div>
            <p>{user.name} logged-in</p>
            {noteForm() }
        </div>
      }
      
      <div className="noteDisplay">
        <button className="importantBtn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Important" : "All"}
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
