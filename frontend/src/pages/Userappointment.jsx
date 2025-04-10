import React from 'react';

const Userappointment = () => {
  return (
    <div className="p-10">
      <div className="max-w-4xl mx-auto p-8 shadow-lg">
        <h1 className="text-center text-teal-700 text-2xl font-bold mb-6">USER APPOINTMENTS</h1>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="border p-2">DATE</th>
              <th className="border p-2">USER NAME</th> {/* Added User Name column */}
              <th className="border p-2">PET NAME</th>
              <th className="border p-2">REASON FOR VISIT</th>
              <th className="border p-2">STATUS</th>
              <th className="border p-2">CHANGE STATUS</th> {/* New column for status dropdown */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center">02-01-2023</td>
              <td className="border p-2 text-center">John Doe</td> {/* User name */}
              <td className="border p-2 text-center">Rex</td>
              <td className="border p-2 text-center">Routine Check-up</td>
              <td className="border p-2 text-center">Completed</td>
              <td className="border p-2 text-center">
                <select className="border p-2 rounded">
                  <option>Accept</option>
                  <option>Reject</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="border p-2 text-center">04-01-2023</td>
              <td className="border p-2 text-center">Jane Smith</td> {/* User name */}
              <td className="border p-2 text-center">Bella</td>
              <td className="border p-2 text-center">Vaccination</td>
              <td className="border p-2 text-center">Completed</td>
              <td className="border p-2 text-center">
                <select className="border p-2 rounded">
                  <option>Accept</option>
                  <option>Reject</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="border p-2 text-center">09-01-2023</td>
              <td className="border p-2 text-center">Emily White</td> {/* User name */}
              <td className="border p-2 text-center">Luna</td>
              <td className="border p-2 text-center">Surgery (Spaying)</td>
              <td className="border p-2 text-center">Scheduled</td>
              <td className="border p-2 text-center">
                <select className="border p-2 rounded">
                  <option>Accept</option>
                  <option>Reject</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="border p-2 text-center">12-01-2023</td>
              <td className="border p-2 text-center">Max Green</td> {/* User name */}
              <td className="border p-2 text-center">Max</td>
              <td className="border p-2 text-center">Vaccination</td>
              <td className="border p-2 text-center">Completed</td>
              <td className="border p-2 text-center">
                <select className="border p-2 rounded">
                  <option>Accept</option>
                  <option>Reject</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="border p-2 text-center">19-01-2023</td>
              <td className="border p-2 text-center">Claire Blue</td> {/* User name */}
              <td className="border p-2 text-center">Charlie</td>
              <td className="border p-2 text-center">Vaccination</td>
              <td className="border p-2 text-center">Scheduled</td>
              <td className="border p-2 text-center">
                <select className="border p-2 rounded">
                  <option>Accept</option>
                  <option>Reject</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userappointment;
