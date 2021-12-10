const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1})
    
    response.status(200).json(blogs)
})


blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    
    response.status(200).json(blog)
})

blogRouter.post('/', userExtractor, async (request, response) => {
    const blog = new Blog(request.body)
    const token = request.token
    const signedInUser = await User.findById(request.user)

    if (!token) {
        return response.status(401).json(
            { error: "Missing or invalid token"}
        )
    }

    if (!blog.likes) {
        blog.likes = 0
    }
    
    const user = await User.findById(signedInUser._id)

    blog.user = user._id

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    await User.findByIdAndUpdate(user._id, user, { new: true })

    response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
   const signedInUser = await User.findById(request.user)
   const blog = await Blog.findById(request.params.id)

   if (!blog.user || !(blog.user.toString() === signedInUser._id.toString())) {
        return response.status(401).json({
            error: "Only the user who created the blog can delete it"
        })
   }
   
   await Blog.findByIdAndRemove(request.params.id)
   response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes, user, id } = request.body

    const actualUser = await User.findById(user.id)

    const updatedBlog = {
        title,
        author,
        url,
        likes,
        user: actualUser,
        id,
    }

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
    response.status(200).json(updatedBlog)
})

module.exports = blogRouter