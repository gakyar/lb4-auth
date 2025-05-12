import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { FiUserPlus, FiLogIn } from 'react-icons/fi';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:3000/signup', {
        email,
        password,
      });
      alert('Signup successful');
      resetForm();
    } catch (error) {
      alert(error.response?.data?.error?.message || 'Signup failed');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      alert(res.data.message);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.error?.message || 'Login failed');
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h2>Login / Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>
          <FiUserPlus style={{ marginRight: '8px' }} />
          Signup
        </button>
        <button onClick={handleLogin}>
          <FiLogIn style={{ marginRight: '8px' }} />
          Login
        </button>
      </div>
    </div>
  );
}

export default App;
