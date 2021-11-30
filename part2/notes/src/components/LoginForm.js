import React from "react";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            username
            <input
              id="username"
              type="text"
              value={username}
              name="username"
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            password
            <input
              id="password"
              type="password"
              value={password}
              name="password"
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm
