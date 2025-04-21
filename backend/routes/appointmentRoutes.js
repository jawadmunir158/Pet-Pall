import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getUserAppointments
} from '../controllers/appointmentController.js';

import verifyToken from '../middleware/verifyToken.js'; // 👈 Import your middleware

const router = express.Router();

router.post('/', verifyToken, createAppointment); // 👈 Secured route
router.get('/', getAppointments);                // All appointments (admin maybe)
router.get('/user', verifyToken, getUserAppointments); // 👈 New route for logged-in user's appointments
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
