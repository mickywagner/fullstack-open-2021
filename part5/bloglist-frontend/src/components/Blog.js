import React, { useState } from 'react'

const Blog = ({blog, updateBlog}) => {
  const [ isExpanded, setIsExpanded ] = useState(false)

  const showWhenExpanded = { display: isExpanded ? "block" : "none"}
  const btnTxt = isExpanded ? "hide" : "view"

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    let newLikes = blog.likes + 1
    const modifiedBlog = { ...blog, likes: newLikes}
    updateBlog(blog.id, modifiedBlog)
  }

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setIsExpanded(!isExpanded)}>{btnTxt}</button>
      <div style={showWhenExpanded}>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={addLike}>like</button><br />
        {blog.user.name}<br />
      </div>
    </div> 
  )
}

export default Blog