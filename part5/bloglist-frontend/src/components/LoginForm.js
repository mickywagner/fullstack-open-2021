import React, { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input 
            id="username" 
            type="text" 
            name="username" 
            value={username} 
            onChange={({ target }) => setUsername(target.value)}
        />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
