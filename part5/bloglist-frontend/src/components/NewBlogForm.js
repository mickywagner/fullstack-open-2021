import React, { useState } from "react"
import PropTypes from "prop-types"

const NewBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setURL] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    addBlog({ title, author, url })

    setTitle("")
    setAuthor("")
    setURL("")
  }

  return (
    <div className="newBlogForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title: </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="author">author: </label>
          <input
            id="author"
            name="author"
            type="text"
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="url">url: </label>
          <input
            id="url"
            name="url"
            type="text"
            value={url}
            onChange={({ target }) => {
              setURL(target.value)
            }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default NewBlogForm
