import Appointment from '../models/Appointment.js';  // Ensure the model is imported correctly

export const createAppointment = async (req, res) => {
  console.log('Received appointment data:', req.body);

  const { fullName, email, petAge, petBreed, selectedDoctor, petType, serviceType, medications, previousConditions, conditionInfo } = req.body;

  if (!fullName || !email || !petAge || !petBreed || !selectedDoctor || !petType || !serviceType) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newAppointment = new Appointment({
      userId: req.userId, // 👈 Add this
      fullName,
      email,
      petAge,
      petBreed,
      selectedDoctor,
      petType,
      serviceType,
      medications,
      previousConditions,
      conditionInfo
    });

    await newAppointment.save();
    console.log('Appointment booked successfully');
    return res.status(200).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({ message: 'Failed to create appointment', error });
  }
};

// Controller to get all appointments (GET)
export const getAppointments = async (req, res) => {
  console.log('GET /api/appointments hit'); // 👈 Add this
  try {
    const appointments = await Appointment.find();
    console.log('Appointments:', appointments); // 👈 Add this
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Failed to fetch appointments', error });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Failed to update appointment', error });
  }
};

// Controller to delete an appointment (DELETE)
export const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);  // Log the error for debugging
    res.status(500).json({ message: 'Failed to delete appointment', error });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    res.status(500).json({ message: 'Failed to fetch user appointments', error });
  }
};
