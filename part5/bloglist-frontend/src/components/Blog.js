import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, updateBlog, handleRemove, user }) => {
  const [ isExpanded, setIsExpanded ] = useState(false)

  const showWhenExpanded = { display: isExpanded ? "block" : "none" }
  const btnTxt = isExpanded ? "hide" : "view"

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    let newLikes = blog.likes + 1
    const modifiedBlog = { ...blog, likes: newLikes }
    updateBlog(blog.id, modifiedBlog)
  }

  const removeClick = () => {
    const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmation) {
      handleRemove(blog.id)
    }
  }
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setIsExpanded(!isExpanded)}>{btnTxt}</button>
      <div style={showWhenExpanded}>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={addLike}>like</button><br />
        {blog.user.name}<br />
        {
          blog.user.username === user.username && <button onClick={removeClick}>remove</button>
        }

      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.string
}



export default Blog