// routes/userRoute.js
import express from 'express';
import {
    loginUser,
    registerUser,
    adminLogin,
    getUserProfile,
    verifyEmail,
    resetPassword
  } from '../controllers/userController.js';
  
  
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/profile', getUserProfile);  // New route
userRouter.post('/verifyemail', verifyEmail); // Email check
userRouter.post('/resetpassword', resetPassword); // Password reset




export default userRouter;

