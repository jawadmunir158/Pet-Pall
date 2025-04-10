import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const doctors = [
  {
    name: 'Dr. Maha Ijaz',
    image: 'https://media-mct1-1.cdn.whatsapp.net/v/t61.24694-24/472011552_486121977449881_6334751090301795523_n.jpg?ccb=11-4&oh=01_Q5AaIBQHtK66JIm2_NvX06t5dYMfr3Z3-ionK-tNnP5_4pQM&oe=679C55E6&_nc_sid=5e03e0&_nc_cat=103',
  },
  {
    name: 'Dr. Jawad',
    image: 'https://avatars.githubusercontent.com/u/127825377?v=4',
  },
];

const DocPanel = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  const handleDoctorSelect = (doctorName) => {
    if (selectedDoctor === doctorName) {
      setSelectedDoctor(null);
    } else {
      setSelectedDoctor(doctorName);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6 flex flex-col shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-8">Doctor Dashboard</h2>
        <div className="flex flex-col space-y-6">
          {/* Reschedule Appointments */}
          <div
            className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => navigate('/reschedule')}
          >
            <FontAwesomeIcon icon={faCalendarCheck} className="text-white mr-4" />
            <h3 className="text-lg font-semibold">Reschedule Appointments</h3>
          </div>
          {/* User Appointment Status */}
          <div
            className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => navigate('/user')}
          >
            <FontAwesomeIcon icon={faClipboardList} className="text-white mr-4" />
            <h3 className="text-lg font-semibold">User Appointment Status</h3>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {selectedDoctor ? selectedDoctor : 'Choose a Doctor'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer"
              onClick={() => handleDoctorSelect(doctor.name)}
            >
              <img
                alt={`Portrait of ${doctor.name}`}
                className="w-32 h-32 rounded-full mx-auto border-4 border-teal-500"
                src={doctor.image}
              />
              <h2 className="text-xl font-semibold mt-4 text-gray-800">{doctor.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocPanel;
