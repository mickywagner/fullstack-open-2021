import React, { useState, useEffect, useRef } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

function App() {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNewNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setErrorMessage(
          `Note "${note.content}" was alredy removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note.id !== id))
      })
  }

  const handleLogin = async (userObj) => {
    try {
      const user = await loginService.login(userObj)

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeNote = async (id) => {
    await noteService.remove(id)
    setNotes(notes.filter(note => note.id !== id))
  }

  let notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div className="App">
      <h1>Note Keeper</h1>

      <Notification message={errorMessage} />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNewNote} />
          </Togglable>
        </div>
      )}

      <div className="noteDisplay">
        <button className="importantBtn" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Important' : 'All'}
        </button>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportance(note.id)}
              removeNote={removeNote}
            />
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export default App
