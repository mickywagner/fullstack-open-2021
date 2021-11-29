const User = require('../models/user')
const jwt = require("jsonwebtoken")

const logger = require('./logger')

const requestHandler = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error('Error message: ', error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }
    
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: '404 no page found'})
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    request.user = await User.findById(decodedToken.id)

    next()
}

module.exports = {
    errorHandler,
    requestHandler,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
}
    