import express from 'express';
import 'reflect-metadata'; 
import './database'; 
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json()); 
app.use('/api', userRoutes); 
app.use('/api', authRoutes); 

export default app;
