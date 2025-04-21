import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  petAge: { type: Number, required: true },
  petBreed: { type: String, required: true },
  selectedDoctor: { type: String, required: true },
  petType: { type: String, required: true },
  serviceType: { type: String, required: true },
  medications: { type: String },
  previousConditions: { type: String },
  conditionInfo: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
