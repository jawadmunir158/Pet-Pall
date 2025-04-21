import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import appointmentRouter from './routes/appointmentRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import scheduleRoute from './routes/scheduleRoute.js';
import doctorPRoutes from './routes/doctorPRoutes.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Database and cloud storage connection
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/doctor', doctorRoutes);
app.use('/api/schedule', scheduleRoute); // Use the schedule route
app.use('/api/doctor', doctorPRoutes); // Change to use "/api/doctor" prefix

// Default route
app.get('/', (req, res) => {
    res.send("API WORKING");
});

// Start the server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
