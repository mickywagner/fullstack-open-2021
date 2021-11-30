import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('blogAppLoginUser'))
    if (loggedInUser) {
      setUser(loggedInUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = event.target;
    const userToLogin = { username: username.value, password: password.value };

    try {
      const response = await loginService.login(userToLogin);
      setUser(response);
      window.localStorage.setItem('blogAppLoginUser', JSON.stringify(response))
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppLoginUser')
    setUser(null)
  }

  return (
    <>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <LoginForm handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>

          <p>{user.name} logged in  <button onClick={handleLogout}>Logout</button></p>
         

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
