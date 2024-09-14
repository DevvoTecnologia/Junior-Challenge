import express from 'express';
import 'reflect-metadata'; 
import './database'; 
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import ringRoutes from './routes/ringRoutes';

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/api', userRoutes); 
app.use('/api', authRoutes); 
app.use('/api', ringRoutes); 

export default app;
