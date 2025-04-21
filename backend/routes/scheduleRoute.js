import express from 'express';
import Schedule from '../models/Schedule.js'; // Importing the Schedule model

const router = express.Router();

// Get all schedule entries
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find(); // Retrieve all schedule entries
    res.json(schedules); // Return the schedules as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Return an error if something goes wrong
  }
});

// Add a new schedule entry
router.post('/', async (req, res) => {
  const schedule = new Schedule({
    date: req.body.date,
    time: req.body.time,
    patient: req.body.patient,
    service: req.body.service,
    status: req.body.status,
  });

  try {
    const newSchedule = await schedule.save(); // Save the new schedule to the database
    res.status(201).json(newSchedule); // Return the saved schedule as a JSON response with 201 status
  } catch (err) {
    res.status(400).json({ message: err.message }); // Return an error if the save fails
  }
});

// Delete, Decline, or Accept schedule entry
router.patch('/:id', async (req, res) => {
    const { action } = req.body;
  
    try {
      const schedule = await Schedule.findById(req.params.id);
      if (!schedule) {
        console.log('Schedule not found');
        return res.status(404).json({ message: 'Schedule not found' });
      }
  
      if (action === 'delete') {
        console.log('Deleting schedule:', schedule); // Log before deleting
        await Schedule.findByIdAndDelete(req.params.id); // Use findByIdAndDelete to delete
        return res.status(200).json({ message: 'Schedule deleted' });
      }
  
      if (action === 'decline') {
        schedule.status = 'Declined';
        await schedule.save();
        return res.status(200).json({ message: 'Schedule status updated to Declined' });
      }
  
      if (action === 'accept') {
        schedule.status = 'Accepted';
        await schedule.save();
        return res.status(200).json({ message: 'Schedule status updated to Accepted' });
      }
  
      return res.status(400).json({ message: 'Invalid action' });
    } catch (err) {
      console.error('Error in PATCH /schedule/:id', err);
      res.status(500).json({ message: err.message });
    }
  });
  
export default router; // Export the router so it can be used in the main server
