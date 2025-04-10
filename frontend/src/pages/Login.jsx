import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/frontend_assets/assets'; // Adjust the path as necessary
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

// Import images
const signUpImage = assets.sign_up; // Adjust the property name based on your assets structure
const loginImage = assets.login; // Adjust the property name based on your assets structure

const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Validation for empty fields
        if (!email || !password || (currentState === 'Sign Up' && !name)) {
            toast.error('Fill all the fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Check the fields');
            return;
        }

        // Password length validation
        if (password.length < 6) {
            toast.error('Password must be greater than 6 characters');
            return;
        }

        try {
            if (currentState === 'Sign Up') {
                const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
                  if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token' , response.data.token)
                  }
                  else {
                    toast.error(response.data.message)
                }
                
            } else {
                const response = await axios.post(backendUrl + '/api/user/login' , {email,password})
              if (response.data.success) {
                  setToken(response.data.token)
                  localStorage.setItem('token' , response.data.token)
              }
              else{
                toast.error(response.data.message)
              }
                
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response) {
                if (error.response.status === 409) {
                    toast.error("User Already Exists!"); // ✅ Show toast if user exists
                } else {
                    toast.error(error.response.data.message || "Registration failed!");
                }
            } else {
                toast.error("Something went wrong!");
            }
        }
    };

    useEffect(()=>{
             if (token) {
                navigate('/')
             }
    },[token])

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center w-full">
            <ToastContainer />
            <div className="flex-shrink-0 mt-10">
                <img
                    src={currentState === 'Sign Up' ? signUpImage : loginImage}
                    alt={currentState}
                    className="w-96 h-96 mb-4"
                />
            </div>
            <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <p className='prata-regular text-3xl'>{currentState}</p>
                    <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
                </div>

                {currentState === 'Login' ? '' : (
                    <input
                        type="text"
                        className='w-full px-3 py-2 border border-gray-800'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={currentState === 'Sign Up'}
                    />
                )}
                <input
                    type="email"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className='w-full flex justify-between text-sm mt-[-8px] '>
                    <p className='cursor-pointer'>Forgot Your Password?</p>
                    {
                        currentState === 'Login'
                            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
                            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
                    }
                </div>
                <button className='bg-black text-white font-light px-8 py-2 mt-4'>
                    {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default Login;
