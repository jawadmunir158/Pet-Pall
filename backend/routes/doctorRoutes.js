import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Register Doctor
router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: "Doctor already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDoctor = new Doctor({
      fullName,
      email,
      password: hashedPassword,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register doctor", error });
  }
});

// Login Doctor
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create a JWT token
    const token = jwt.sign(
      { doctor: { id: doctor._id, email: doctor.email } },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Failed to login doctor", error });
  }
});

export default router;
