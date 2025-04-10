import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../components/Title';
import emailjs from '@emailjs/browser';

const Appointment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    petAge: '',
    petBreed: '',
    selectedDoctor: '',
    petType: '',
    serviceType: '',
    medications: '',
    previousConditions: '',
    conditionInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email } = formData;

    if (!fullName || !email) {
      toast.error('Please fill all fields');
      return;
    }

    // Prepare template parameters for the message
    const templateParams = {
      from_name: fullName,
      from_email: email,
      message: `Hello ${fullName}, your appointment has been successfully booked!`,
      pet_age: formData.petAge,
      pet_breed: formData.petBreed,
      selected_doctor: formData.selectedDoctor,
      pet_type: formData.petType,
      service_type: formData.serviceType,
      medications: formData.medications,
      previous_conditions: formData.previousConditions,
      condition_info: formData.conditionInfo,
      to_email: email, // Ensure that this is set correctly
    };

    console.log('Template Parameters:', templateParams); // Debugging output

    // Send email using EmailJS
    emailjs
      .send('service_s5rjrdw', 'template_kn0m36k', templateParams, 'AJNKx2IBF6i0NqUOH')
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          toast.success('Appointment booked successfully! A confirmation email has been sent.');

          // Reset form data only on success
          setFormData({
            fullName: '',
            email: '',
            petAge: '',
            petBreed: '',
            selectedDoctor: '',
            petType: '',
            serviceType: '',
            medications: '',
            previousConditions: '',
            conditionInfo: '',
          });
        },
        (err) => {
          console.error('FAILED...', err);
          toast.error('There was an error. Please try again later.');
          // Do not reset form data here
        }
      );
  };

  return (
    <div className='flex justify-center items-center'>
      <ToastContainer />
      <div className='w-full max-w-xl border p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold'>Request an Appointment</h1>
          <div className='flex items-center'>
            <div className='bg-teal-500 p-1 rounded-full'>
              <i className='fas fa-cog text-white'></i>
            </div>
            <span className='ml-2 text-teal-500 font-bold'>Pet Pall</span>
          </div>
        </div>

        <div className='text-xl text-center pt-4 border-t mb-4'>
          <Title text1={'Choose Doctor'} text2={'Appointment'} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Select the Doctor:</label>
          <select
            className="w-full p-2 border rounded"
            name="selectedDoctor"
            onChange={handleChange}
            >
            <option value="">Please select</option>
            <option value="Dr. Maha Ijaz">Dr. Maha Ijaz</option>
            <option value="Dr. Jawad">Dr. Jawad</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">What pet do you have?</label>
            <div className="grid grid-cols-3 gap-2">
              {['Cats', 'Dogs', 'Birds', 'Rabbits', 'Horse', 'Ferrets', 'Fish', 'Guinea pig', 'Other'].map((pet) => (
                <label key={pet} className="flex items-center text-gray-700">
                  <input
                    className="mr-2"
                    name="petType"
                    type="radio"
                    value={pet}
                    onChange={handleChange}
                  />
                  {pet}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">What type of veterinary services are you looking for?</label>
            <select
              className="w-full p-2 border rounded"
              name="serviceType"
              onChange={handleChange}
            >
              <option value="">Please select</option>
              <option value="General Checkup">General Checkup</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Surgery">Surgery</option>
              <option value="Dental Care">Dental Care</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Your name:</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="p-2 border rounded"
                name="fullName"
                placeholder="Full Name"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Your email address:</label>
            <input
              className="w-full p-2 border rounded"
              name="email"
              placeholder="Your email address"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Pet's Age:</label>
            <input
              className="w-full p-2 border rounded"
              name="petAge"
              placeholder="Pet's Age"
              type="text"
              value={formData.petAge}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Pet's Breed:</label>
            <input
              className="w-full p-2 border rounded"
              name="petBreed"
              placeholder="Pet's Breed"
              type="text"
              value={formData.petBreed}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Is your pet currently on any medication?</label>
            <textarea
              className="w-full p-2 border rounded"
              name="medications"
              placeholder="Please list any medications"
              rows="2"
              value={formData.medications}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Has your pet had any previous surgeries or medical conditions?</label>
            <textarea
              className="w-full p-2 border rounded"
              name="previousConditions"
              placeholder="Please describe any previous surgeries or medical conditions"
              rows="2"
              value={formData.previousConditions}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Please share information about your pet's condition:</label>
            <textarea
              className="w-full p-2 border rounded"
              name="conditionInfo"
              rows="4"
              value={formData.conditionInfo}
              onChange={handleChange}
              ></textarea>
            </div>
  
            <button className="w-full bg-black text-white p-2 rounded" type="submit">
              Book Vet
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Appointment;