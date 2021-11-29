const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const logger = require('../utils/logger')

userRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    if (password.length < 3) {
        return response.status(400).json({
            error: "User validation failed: password must be 3 characters or longer"
        })
    }

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})


userRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users)
})

module.exports = userRouter