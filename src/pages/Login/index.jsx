import React, { useEffect, useState } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';

function Login() {
  const { push } = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const minPasswordLenght = 7;
    const emailRegx = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    const passwordValid = password.length >= minPasswordLenght;
    const emailValid = emailRegx.test(email);

    setDisabled(!(passwordValid && emailValid));
  }, [email, password]);

  function LoginClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    push('/foods');
  }

  return (
    <div className="login">
      <div className="login-input">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
          className="input-field"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          placeholder="Password"
          data-testid="password-input"
          className="input-field"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </div>
      <input
        type="button"
        value="Enter"
        data-testid="login-submit-btn"
        className="login-button"
        disabled={ disabled }
        onClick={ LoginClick }
      />
    </div>
  );
}

export default Login;
