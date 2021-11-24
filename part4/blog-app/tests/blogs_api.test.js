const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('Viewing notes with a few blogs in db', () => {
    test('notes are returned as json', async () => {
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
    test('is successful with valid data', async () => {
        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 4,
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const newBlogsList = await api.get('/api/blogs')
        expect(newBlogsList.body).toHaveLength(helper.initialBlogs.length + 1)
    
        const titles = newBlogsList.body.map(blog => blog.title) 
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
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const result = await api.get('/api/blogs')
        const theOneIWant = result.body.find(blog => blog.url === blogWithNoLikes.url)
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
            .expect(400)
    
        const result = await api.get('/api/blogs')
        expect(result.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('fails with status 400 if url is missing', async () => {
        const blogWithNoTitle = {
            title: "TDD harms architecture",
            author: "Robert C. Martin"
        }
    
        await api
            .post('/api/blogs')
            .send(blogWithNoTitle)
            .expect(400)
    
        const result = await api.get('/api/blogs')
        expect(result.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Deleting a blog', () => {
    test('can delete a blog with a valid id', async () => {
        const response = await api.get('/api/blogs')
        const noteToDelete = response.body[0].id

        await api
            .delete(`/api/blogs/${noteToDelete}`)
            .send(noteToDelete)
            .expect(204)
    })
})

describe('Updating a blog post', () => {
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
})



afterAll(() => {
    mongoose.connection.close()
})