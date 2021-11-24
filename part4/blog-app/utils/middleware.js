const logger = require('./logger')

const requestHandler = (request, resposne, next) => {
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
    
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: '404 no page found'})
}

module.exports = {
    errorHandler,
    requestHandler,
    unknownEndpoint
}
    