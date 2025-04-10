import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const templateParams = {
      from_name: 'PetPall', // Use the constant name directly
      email: email,
    };

    emailjs.send('service_s5rjrdw', 'template_y877fh8', templateParams, 'AJNKx2IBF6i0NqUOH')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccessMessage('Thank you for subscribing! You will receive a 20% discount on your next purchase.');
        setEmail(''); // Clear the email input after successful submission
      }, (err) => {
        console.error('FAILED...', err);
        setSuccessMessage('There was an error. Please try again later.');
      });
  };

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe Now to get 20% Discount</p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis maiores possimus cumque excepturi, modi iusto corrupti saepe explicabo doloremque tenetur vitae magnam! Voluptates quasi commodi laborum praesentium tempore eligendi cumque.
      </p>

      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input
          className='w-full sm:flex-1 outline-none'
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>

      {successMessage && <p className='text-green-500 mt-4'>{successMessage}</p>}
    </div>
  );
};

export default NewsLetterBox;