import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    patient: '',
    service: '',
    status: 'Pending',
  });

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/schedule');
        setScheduleData(response.data);
      } catch (error) {
        console.log('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/schedule/${id}`, { action });
      alert(response.data.message);

      if (action === 'delete') {
        setScheduleData(scheduleData.filter(schedule => schedule._id !== id));
      } else {
        const updatedStatus = action.charAt(0).toUpperCase() + action.slice(1);
        setScheduleData(scheduleData.map(schedule => 
          schedule._id === id ? { ...schedule, status: updatedStatus } : schedule
        ));
      }
    } catch (error) {
      console.error('Error handling action:', error);
      alert('Something went wrong');
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSchedule = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/schedule', formData);
      setScheduleData([...scheduleData, response.data]);
      alert('Schedule added successfully!');
      setShowForm(false);
      setFormData({
        date: '',
        time: '',
        patient: '',
        service: '',
        status: 'Pending',
      });
    } catch (error) {
      console.error('Error adding schedule:', error);
      alert('Failed to add schedule.');
    }
  };

  return (
    <div className="relative p-6 md:p-10 bg-gray-50 min-h-screen">
      
      {/* Floating Edit Schedule Button */}
      <button
        className="fixed bottom-6 right-6 bg-teal-600 text-white rounded-full w-14 h-14 text-3xl shadow-lg hover:bg-teal-700 transition"
        title="Edit Schedule"
        onClick={() => setShowForm(true)}
      >
        +
      </button>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Schedule</h2>
            <div className="space-y-3">
              <input type="date" name="date" value={formData.date} onChange={handleFormChange} className="w-full p-2 border rounded" />
              <input type="text" name="time" placeholder="Time" value={formData.time} onChange={handleFormChange} className="w-full p-2 border rounded" />
              <input type="text" name="patient" placeholder="Patient" value={formData.patient} onChange={handleFormChange} className="w-full p-2 border rounded" />
              <input type="text" name="service" placeholder="Service" value={formData.service} onChange={handleFormChange} className="w-full p-2 border rounded" />
              <select name="status" value={formData.status} onChange={handleFormChange} className="w-full p-2 border rounded">
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Declined">Declined</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={handleAddSchedule} className="px-4 py-2 bg-teal-600 text-white rounded">Update Schedule</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="max-w-6xl mx-auto p-6 md:p-10 shadow-lg border rounded-xl bg-white">
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm table-auto border-collapse">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Service</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">Loading...</td>
                </tr>
              ) : scheduleData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">No schedule available.</td>
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
                    <td className="p-4">
                      <select
                        onChange={(e) => handleAction(schedule._id, e.target.value)}
                        className="px-4 py-2 text-white bg-teal-500 rounded-lg"
                      >
                        <option value="">Select Action</option>
                        <option value="accept">Accept</option>
                        <option value="decline">Decline</option>
                        <option value="delete">Delete</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
