import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Profile = () => {
  const [doctorProfile, setDoctorProfile] = useState({
    name: '',
    specialization: '',
    contactInfo: { phone: '', email: '' },
    bio: '',
    profilePicture: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the doctor's profile data from the backend
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/doctor/profile');
        setDoctorProfile(response.data);
      } catch (error) {
        console.log('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  
  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-6 md:p-10 shadow-lg border rounded-xl bg-white">
        <h1 className="text-xl font-bold mb-6">Doctor Profile</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {/* Doctor Profile Display */}
            <div className="text-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img src={doctorProfile.profilePicture} alt="Doctor" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-medium">{doctorProfile.name}</h2>
              <p className="text-gray-600">{doctorProfile.specialization}</p>
              <div className="flex justify-center space-x-4 mt-4">
                <a className="text-gray-600 hover:text-gray-800" href="#">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a className="text-gray-600 hover:text-gray-800" href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a className="text-gray-600 hover:text-gray-800" href="#">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a className="text-gray-600 hover:text-gray-800" href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
