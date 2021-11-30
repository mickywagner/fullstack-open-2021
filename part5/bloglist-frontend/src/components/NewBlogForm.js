import React, { useState } from "react";
import blogService from "../services/blogs"

const NewBlogForm = ({setBlogs, setNotification, token, blogs}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault()
    setTitle("")
    setAuthor("")
    setURL("")

    const newBlog = {
        title,
        author,
        url
    }

    const savedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(savedBlog))
    setNotification(`a ne blog ${savedBlog.title} by ${savedBlog.author} was added`)
    setTimeout(() => {
        setNotification(null)
    }, 5000)
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
              setTitle(target.value);
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
              setAuthor(target.value);
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
              setURL(target.value);
            }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
