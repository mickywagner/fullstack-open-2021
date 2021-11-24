const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    
    response.status(200).json(blogs)
})


blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    
    response.status(200).json(blog)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.likes) {
        blog.likes = 0
    }
    
    const result = await blog.save()
    response.status(201).json(result.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const updatedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
    response.status(200).json(updatedBlog)
})

module.exports = blogRouter