const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogRouter')

app.use(middleware.requestHandler)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB: ', error)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/', middleware.unknownEndpoint)

module.exports = app