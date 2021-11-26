const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase(). startsWith('bearer ')) {
    return authorization.substring(7)
  }

  console.log('returning null from getTokenFrom')
  return null
}


// GET ROUTES

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  if (note) {
    response.json(note.toJSON())
  } else {
    response.status(404).end()
  }
})

// POST ROUTES

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)

  console.log('before decoded token')
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(token, process.env.SECRET)

  console.log('after decoded token')

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await User.findOneAndUpdate(body.userId, user, { new: true })

  response.json(savedNote.toJSON())
})

// DELETE ROUTES

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// PUT ROUTES

notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  response.json(updatedNote.toJSON())
})

module.exports = notesRouter