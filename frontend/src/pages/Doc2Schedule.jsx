import React from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const Doc2Schedule = () => {
    return (
        <div className=" p-10">
            <div className="max-w-4xl mx-auto  p-8 shadow-lg">
                <h1 className="text-center text-teal-700 text-2xl font-bold mb-6">MEDICAL APPOINTMENT CALENDAR</h1>

                <div className="grid grid-cols-3 gap-4 mb-6 pl-48">
                    <div className="col-span-2">
                        <div className="bg-teal-700 text-white text-center py-2 font-bold text-lg">DOCTOR DETAILS</div>
                        <div className="flex items-center justify-center py-4">
                            <img
                                src="https://avatars.githubusercontent.com/u/127825377?v=4"
                                alt="Dr.Jawad"
                                className="w-32 h-32 rounded-full object-cover border-2 border-teal-700"
                            />
                        </div>
                        <h2 className="text-teal-700 font-bold text-center">Dr. Jawad</h2>
                        <p className="text-center"><strong>Specialization:</strong> Pet Surgeon</p>
                        <p className="text-center"><strong>Experience:</strong> 10 Years</p>
                    </div>
                </div>
                <h2 className="text-teal-700 font-bold mb-2">JANUARY</h2>
                <table className="w-full border-collapse mb-6">
                    <thead>
                        <tr className="bg-teal-700 text-white">
                            <th className="border p-2">Sun</th>
                            <th className="border p-2">Mon</th>
                            <th className="border p-2">Tue</th>
                            <th className="border p-2">Wed</th>
                            <th className="border p-2">Thu</th>
                            <th className="border p-2">Fri</th>
                            <th className="border p-2">Sat</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2 text-center">Surgery (08-01-2023)</td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center">Diagnosis (05-01-2023)</td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center">Investigation (07-01-2023)</td>
                        </tr>
                        <tr>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center">Surgery (17-01-2023)</td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center">Diagnosis (13-01-2023)</td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center">Investigation (19-01-2023)</td>
                        </tr>
                        <tr>
                            <td className="border p-2 text-center">Investigation (23-01-2023)</td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center">Diagnosis (27-01-2023)</td>
                            <td className="border p-2 text-center">Surgery (28-01-2023)</td>
                        </tr>
                        <tr>
                            <td className="border p-2 text-center">Investigation (29-01-2023)</td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center"></td>
                            <td className="border p-2 text-center">Surgery (31-01-2023)</td>
                        </tr>
                    </tbody>
                </table>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-teal-700 text-white">
                            <th className="border p-2">DATE</th>
                            <th className="border p-2">PATIENT NAME</th>
                            <th className="border p-2">REASON FOR VISIT</th>
                            <th className="border p-2">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2 text-center">02-01-2023</td>
                            <td className="border p-2 text-center">Michael</td>
                            <td className="border p-2 text-center">Mild Heart Stroke</td>
                            <td className="border p-2 text-center">Surgery</td>
                        </tr>
                        <tr>
                            <td className="border p-2 text-center">05-01-2023</td>
                            <td className="border p-2 text-center">Emily</td>
                            <td className="border p-2 text-center">Low Blood Pressure</td>
                            <td className="border p-2 text-center">Diagnosis</td>
                        </tr>
                        <tr>
                            <td className="border p-2 text-center">07-01-2023</td>
                            <td className="border p-2 text-center">Henry</td>
                            <td className="border p-2 text-center">Chest pain</td>
                            <td className="border p-2 text-center">Investigation</td>
                        </tr>
                        <tr>
                            <td className="border p-2 text-center">08-01-2023</td>
                            <td className="border p-2 text-center">Robin</td>
                            <td className="border p-2 text-center">Clogged Artery</td>
                            <td className="border p-2 text-center">Stent</td>
                        </tr>
                        <tr>
                            <td className="border p-2 text-center">13-01-2023</td>
                            <td className="border p-2 text-center">Clayton</td>
                            <td className="border p-2 text-center">High Blood Pressure</td>
                            <td className="border p-2 text-center">Diagnosis</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Doc2Schedule;
