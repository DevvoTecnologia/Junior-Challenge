import express from 'express';
import ringRoutes from './routes/ringRoutes';
import AppDataSource from '../db/data-source';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}))

AppDataSource.initialize()
  .then(() => {
    app.use('/api', ringRoutes);
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch(err => {
    console.error('Error initializing DataSource:', err);
  });
