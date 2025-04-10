import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Navigate function to redirect on success

  const handleLogin = () => {
    // Simple login validation
    if (username === 'jadi' && password === '123') {
      navigate('/docpanel'); // Redirect to the Doctor Dashboard
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Doctor Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Username input */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        {/* Password input */}
        <div className="mb-6">
          <label className="block text-gray-700" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-teal-500 text-white rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
