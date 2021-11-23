const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)

    return likes.reduce((num, sum) => num + sum)
}

const favoriteBlog = (blogs) => {
    let mostLike = 0
    let bestBlog = { title: '', author: '', likes: ''}

    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > mostLike) {
            mostLike = blogs[i].likes
            bestBlog = blogs[i]
        }
    }

    return { title: bestBlog.title, author: bestBlog.author, likes: bestBlog.likes}
}

const mostBlogs = (blogs) => {
    let blogCount = _.countBy(blogs, 'author')
    let array = _.toPairs(blogCount)
    
    let newObject = array.map(item => {
        return { "author": item[0], "blogs": item[1]}
    })

    let sortByDesecnd = _.sortBy(newObject, "blogs").reverse()
    
   return sortByDesecnd[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}