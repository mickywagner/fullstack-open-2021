const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { resource } = require('../app')
const app = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeAll(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('Viewing blogs with a few blogs in db', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('the correct number of blogs are returned', async () => {
        const result = await api.get('/api/blogs')
    
        expect(result.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the unique identifier is id not _id', async () => {
        const result = await api.get('/api/blogs')
    
        expect(result.body[0].id).toBeDefined()
        expect(result.body[0]._id).not.toBeDefined()  
    })
})

describe('Creating a new blog', () => {
    let token = null

    beforeAll(async () => {
        const body =  { username: "rootUser", password: "test12345" }

        const response = await api.post('/api/login').send(body)
        
        token = response.body.token
    })

    test('is successful with valid data and token', async () => {
        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 4,
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .auth(token, { type: 'bearer'})
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const newBlogsList = await helper.blogsInDb()
        expect(newBlogsList).toHaveLength(helper.initialBlogs.length + 1)
    
        const titles = newBlogsList.map(blog => blog.title) 
        expect(titles).toContain(newBlog.title) 
    })
    
    test('if likes not provided, likes default to zero', async () => {
        const blogWithNoLikes = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        }
    
        await api
            .post('/api/blogs')
            .send(blogWithNoLikes)
            .auth(token, { type: 'bearer'})
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsInDb = await helper.blogsInDb()
        const theOneIWant = blogsInDb.find(blog => blog.url === blogWithNoLikes.url)
        expect(theOneIWant.likes).toBeDefined()
        expect(theOneIWant.likes).toBe(0)
    })
    
    test('fails with status 400 if title is missing', async () => {
        const blogWithNoTitle = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        }
    
        await api
            .post('/api/blogs')
            .send(blogWithNoTitle)
            .auth(token, { type: 'bearer'})
            .expect(400)
    
        const blogsInDb = await helper.blogsInDb()
        expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
    })
    
    test('fails with status 400 if url is missing', async () => {
        const blogWithNoTitle = {
            title: "TDD harms architecture",
            author: "Robert C. Martin"
        }
    
        await api
            .post('/api/blogs')
            .send(blogWithNoTitle)
            .auth(token, { type: 'bearer'})
            .expect(400)
    
        const blogsInDb = await helper.blogsInDb()
        expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
    })

    test('fails with status 403 if no token', async () => {
        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 4,
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })

    
})

describe('Deleting a blog', () => {
    test('fails with 401 if no token', async () => {
        const blogToDelete = await helper.initialBlogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete}`)
            .send(blogToDelete)
            .expect(401)
    })

    
})

describe('Updating a blog post', () => {
    let token = null

    beforeAll(async () => {
        const body =  { username: "rootUser", password: "test12345" }

        const response = await api.post('/api/login').send(body)
        
        token = response.body.token
    })

    test('succeeds with a valid id and data', async () => {
        const response = await api.get('/api/blogs')
        const blogToUpdate = response.body[0]

        blogToUpdate.likes = 52

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const result = await api.get(`/api/blogs/${blogToUpdate.id}`)

        expect(result.body.likes).toBe(52)
        
    })

    test('succeeds if token provided and user owns blog', async () => {
        const blogToDelete = {
            title: "blog to be deleted",
            author: "Some Guy",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 4,
        }
      
        const response = await api.post('/api/blogs')
            .send(blogToDelete)
            .auth(token, { type: 'bearer'})
            .expect(201)

        const blogAdded = await Blog.findById(response.body.id)

        await api
            .delete(`/api/blogs/${blogAdded.id}`)
            .send(blogToDelete)
            .auth(token, { type: 'bearer'})
            .expect(response => console.log(response.body))
            .expect(204)  
    })
})



afterAll(() => {
    mongoose.connection.close()
})