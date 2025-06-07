import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:4000/api/user/verifyemail', { email });

      if (data.success) {
        toast.success('Email verified. Enter your new password.');
        setShowNewPassword(true);
      } else {
        toast.error(data.message || 'Email not found');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error('Please enter a new password');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:4000/api/user/resetpassword', {
        email,
        newPassword,
      });

      if (data.success) {
        toast.success('Password reset successfully!');
        setEmail('');
        setNewPassword('');
        setShowNewPassword(false);
      } else {
        toast.error(data.message || 'Password reset failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <ToastContainer />
      <form
        onSubmit={showNewPassword ? handlePasswordReset : handleEmailSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {showNewPassword ? 'New Password' : 'Forgot Password'}
        </h2>

        {!showNewPassword && (
          <>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </>
        )}

        {showNewPassword && (
          <>
            <p className="mb-2 text-sm text-gray-600">Email: <strong>{email}</strong></p>
            <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
        >
          {showNewPassword ? 'Update Password' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
