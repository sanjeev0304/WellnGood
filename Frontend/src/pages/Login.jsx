// src/pages/Login.js
import React, { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth
    alert('Google login would be implemented here');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for login logic
    alert('Login functionality would be implemented here');
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-card">
          <h2>Login to WellandGood</h2>
          
          <button className="google-login" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
          
          <div className="divider">OR</div>
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;