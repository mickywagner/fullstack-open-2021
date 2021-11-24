const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjs = helper.initialBlogs.map(blog => new Blog(blog))

    const blogArray = blogObjs.map(blogObj => blogObj.save())
    await Promise.all(blogArray)
})

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('returns the correct number of blogs', async () => {
    const result = await api.get('/api/blogs')

    expect(result.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is id not _id', async () => {
    const result = await api.get('/api/blogs')

    expect(result.body[0].id).toBeDefined()
    expect(result.body[0]._id).not.toBeDefined()  
})

test('can create a new blog', async () => {
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

test('if likes not provided, defaults to zero', async () => {
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

test('error sent if title is missing', async () => {
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

test('error sent if url is missing', async () => {
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

afterAll(() => {
    mongoose.connection.close()
})