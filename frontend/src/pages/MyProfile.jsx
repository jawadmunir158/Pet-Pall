import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const MyProfile = () => {
  const { token, backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [token, backendUrl]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-6 rounded-xl text-center w-96 border border-gray-300">
        {/* Avatar */}
        <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500 flex items-center justify-center text-4xl font-bold bg-gray-100 text-blue-500">
          {user.name
            .split(' ')
            .map((n) => n[0].toUpperCase())
            .join('')}
        </div>

        {/* Name */}
        <div className="mb-2">
          <h3 className="text-lg font-medium text-gray-700">Name</h3>
          <p className="text-xl font-semibold text-gray-900">{user.name}</p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700">Email</h3>
          <p className="text-base text-gray-800">{user.email}</p>
        </div>

        {/* Password Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">Password</h3>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xl font-mono select-text">
              {'••••••••'}
            </p>
          </div>
          <p className="text-xs mt-2 italic text-gray-500">
            Password is hidden for security.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
