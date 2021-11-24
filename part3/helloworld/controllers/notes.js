const notesRouter = require('express').Router()
const Note = require('../models/note')


// GET ROUTES

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note.toJSON())
  } else {
    response.status(404).end()
  }
})

// POST ROUTES

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important,
    date: new Date(),
  })

  const savedNote = await note.save()
  response.json(savedNote.toJSON())
})

// DELETE ROUTES

notesRouter.delete('/:id', async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// PUT ROUTES

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  response.json(updatedNote.toJSON())
})

module.exports = notesRouter