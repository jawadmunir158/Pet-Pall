import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Appointment from './pages/Appointments';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('doctorToken') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('doctorToken', token);
    }
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
               
                <Route path="/appointments" element={<Appointment token={token}/>} />
                <Route path="/profile" element={<Profile token={token} />} />
                <Route path="/schedule" element={<Schedule token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
