import express from 'express';
import DoctorProfile from '../models/DoctorP.js';

const router = express.Router();

// Get Doctor Profile// Get Doctor Profile
router.get('/profile', async (req, res) => {
    try {
      const doctorProfile = await DoctorProfile.findOne(); // Assuming only one doctor profile
      res.json(doctorProfile);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
router.post('/profile', async (req, res) => {
    const { name, specialization, contactInfo, bio, profilePicture } = req.body;
  
    // Validation: Ensure that the required data is provided
    if (!name || !specialization || !contactInfo || !bio) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
  
    try {
      // Create a new doctor profile
      const newDoctorProfile = new DoctorProfile({
        name,
        specialization,
        contactInfo,
        bio,
        profilePicture,
      });
  
      // Save the new profile to the database
      await newDoctorProfile.save();
  
      // Respond with the created profile
      res.status(201).json(newDoctorProfile);
    } catch (err) {
      console.error('Error adding profile:', err);
      res.status(500).json({ message: err.message });
    }
  });
  
// Update or Create Doctor Profile
router.patch('/profile', async (req, res) => {
  const { name, specialization, contactInfo, bio, profilePicture } = req.body;
  try {
    let doctorProfile = await DoctorProfile.findOne();
    if (!doctorProfile) {
      doctorProfile = new DoctorProfile({
        name,
        specialization,
        contactInfo,
        bio,
        profilePicture,
      });
    } else {
      doctorProfile.name = name;
      doctorProfile.specialization = specialization;
      doctorProfile.contactInfo = contactInfo;
      doctorProfile.bio = bio;
      doctorProfile.profilePicture = profilePicture;
    }

    await doctorProfile.save();
    res.status(200).json(doctorProfile);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
