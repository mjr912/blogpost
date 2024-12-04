import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/Login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('https://localhost:7064/api/Auth/login', {
        email,
        password,
      });

      if (response.status!==200) {
        throw new Error('Login failed');
      }

      navigate('/categories');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='loginPage-container'>
      <h2 className='Title'>Login</h2>
      <form onSubmit={handleLogin} className='form'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className='input--field'
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className='input--field'
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
