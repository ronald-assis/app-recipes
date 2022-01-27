import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login">
      <div className="login-input">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="email"
          data-testid="email-input"
          className="input-field"
        />
        <input
          type="password"
          placeholder="password"
          data-testid="password-input"
          className="input-field"
        />
      </div>
      <input
        type="button"
        value="Enter"
        data-testid="login-submit-btn"
        className="login-button"
      />
    </div>
  );
}

export default Login;
