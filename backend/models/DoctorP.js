import mongoose from 'mongoose';

const doctorProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  bio: { type: String, required: true },
  profilePicture: { type: String }, // URL or path to the profile picture
});

const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema);

export default DoctorProfile;
