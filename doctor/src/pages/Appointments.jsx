import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App'; // Ensure backendUrl is imported if used
import { toast } from 'react-toastify';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('doctorToken'); // Get the token from localStorage

    if (token) {
      // Send token in Authorization header for protected routes
      axios
        .get(`${backendUrl}/api/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
          },
        })
        .then((res) => setAppointments(res.data))
        .catch((err) => console.error('Error fetching appointments:', err));
    } else {
      console.log('No token found');
    }
  }, []);

  const handleAccept = (appointmentId, userEmail) => {
    axios
      .post(`${backendUrl}/api/appointments/accept`, {
        appointmentId,
        userEmail,
      })
      .then(() => {
        toast.success('Appointment accepted, email sent to the user.');
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appt) => appt._id !== appointmentId)
        ); // Remove the accepted appointment from the list
      })
      .catch((err) => {
        console.error('Error accepting appointment:', err);
        toast.error('Error accepting appointment.');
      });
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    axios
      .put(`${backendUrl}/api/appointments/${appointmentId}`, { status: newStatus })
      .then(() => {
        toast.success(`Appointment status updated to ${newStatus}`);
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === appointmentId ? { ...appt, status: newStatus } : appt
          )
        );
      })
      .catch((err) => {
        console.error('Error updating status:', err);
        toast.error('Failed to update appointment status.');
      });
  };


  const handleDelete = (appointmentId) => {
    axios
      .delete(`${backendUrl}/api/appointments/${appointmentId}`)
      .then(() => {
        toast.success('Appointment deleted.');
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appt) => appt._id !== appointmentId)
        ); // Remove the deleted appointment from the list
      })
      .catch((err) => {
        console.error('Error deleting appointment:', err);
        toast.error('Error deleting appointment.');
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Doctor's Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <tr>
                <th className="py-3 px-5 text-left">User Name</th>
                <th className="py-3 px-5 text-left">Pet Type</th>
                <th className="py-3 px-5 text-left">Pet Breed</th>
                <th className="py-3 px-5 text-left">Service</th>
                <th className="py-3 px-5 text-left">Date</th>
                <th className="py-3 px-5 text-left">Action</th>
                <th className="py-3 px-5 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr
                  key={index}
                  className={`transition duration-200 ${index % 2 === 0 ? 'bg-purple-50' : 'bg-pink-50'
                    } hover:bg-yellow-100`}
                >
                  <td className="py-3 px-5">{appt.fullName}</td>
                  <td className="py-3 px-5">{appt.petType}</td>
                  <td className="py-3 px-5">{appt.petBreed}</td>
                  <td className="py-3 px-5">{appt.serviceType}</td>
                  <td className="py-3 px-5">
                    {new Date(appt.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-5">
                    <select
                      value={appt.status}
                      onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </td>

                  <td className="py-3 px-5">
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded ml-2"
                      onClick={() => handleDelete(appt._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointments;
