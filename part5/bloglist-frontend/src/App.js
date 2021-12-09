import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import NotificationMessage from "./components/NotificationMessage";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      window.localStorage.getItem("blogAppLoginUser")
    );
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = event.target;
    const userToLogin = { username: username.value, password: password.value };

    try {
      const response = await loginService.login(userToLogin);
      setUser(response);
      window.localStorage.setItem("blogAppLoginUser", JSON.stringify(response));
      blogService.setToken(response.token);
    } catch (exception) {
      console.log("catch block::", exception);
      setNotification("wrong username or password");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("blogAppLoginUser");
    setUser(null);
  };

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    
    const savedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(savedBlog));
    setNotification(
      `a new blog ${savedBlog.title} by ${savedBlog.author} was added`
    );
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const updateBlog = async (id, modifiedBlog) => {
    const response = await blogService.update(id, modifiedBlog);
  };

  return (
    <>
      <NotificationMessage message={notification} />

      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <LoginForm handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <NewBlogForm blogs={blogs} addBlog={addBlog} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
