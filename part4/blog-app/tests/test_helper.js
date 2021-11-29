const Blog = require('../models/blogs');
const User = require('../models/user');

const initialBlogs = [
  {
    _id: "5a422bc44b54a676234d17fc",
    title: "Other type wars blog",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  }
];

initialUsers = [
  {
    _id: "61a13a4fa94df60b33d3db4f",
    username: "rootUser",
    name: "Root User",
    passwordHash: "$2b$10$mt8KmJOZqAfa8MEnsEhfPulkcGE4lpnBk1Orjf5McFqHp1YssY4re"
  }
]

const createToken = async () => {
  
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = { 
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}