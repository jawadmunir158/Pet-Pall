import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import Title from '../components/Title';

const Doc2Schedule = () => {
  const { backendUrl } = useContext(ShopContext);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadScheduleData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/schedule`);
      if (response.status === 200) {
        setScheduleData(response.data.reverse());
      } else {
        console.log('Failed to load Schedule');
      }
    } catch (error) {
      console.log('Error loading Schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScheduleData();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-6 md:p-10 shadow-lg border rounded-xl bg-white">

        {/* Title Centered Above */}
        <div className="text-center mb-8">
          <Title text1="Doctor" text2="Schedule" />
        </div>

        {/* Doctor Profile */}
        <div className="flex flex-col items-center text-center mb-10">
          <img
            src="https://avatars.githubusercontent.com/u/127825377?v=4"
            alt="Dr. Jawad"
            className="w-32 h-32 rounded-full object-cover border-4 border-teal-600 shadow-md"
          />
          <h2 className="text-2xl text-teal-700 font-bold mt-3">Dr. Jawad</h2>
          <p className="text-gray-600"><strong>Specialization:</strong> Pet Surgeon</p>
          <p className="text-gray-600"><strong>Experience:</strong> 10 Years</p>
        </div>

        {/* Appointment Table */}
        <div className="overflow-x-auto border rounded-lg">
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm table-auto border-collapse">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Service</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : scheduleData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No schedule available.
                  </td>
                </tr>
              ) : (
                scheduleData.map((schedule, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-yellow-100 transition duration-300`}
                  >
                   <td className="p-4">{new Date(schedule.date).toLocaleDateString()}</td>
                    <td className="p-4">{schedule.time}</td>
                    <td className="p-4">{schedule.patient}</td>
                    <td className="p-4">{schedule.service}</td>
                    <td className="p-4">{schedule.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Doc2Schedule;
