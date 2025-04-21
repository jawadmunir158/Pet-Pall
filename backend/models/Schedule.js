import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  patient: { type: String, required: true },
  service: { type: String, required: true },
  status: { type: String, required: true },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule; // Make sure to export the model as default
