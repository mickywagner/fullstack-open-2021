import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    createNote({
      content: newNote,
      important: Math.random() > 0.5,
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <label htmlFor="new">New note: </label>
        <input id="new" value={newNote} onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default NoteForm
