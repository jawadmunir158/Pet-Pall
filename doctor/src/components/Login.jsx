import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('Attempting login with email:', email);

    try {
      const response = await axios.post(backendUrl + '/api/doctor/login', {
        email,
        password,
      });

      if (response.data.token) {
        console.log('Login Response:', response.data);
        setToken(response.data.token);
        toast.success('Login successful');
        navigate('/Appointments');
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Doctor Panel</h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="*******"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
