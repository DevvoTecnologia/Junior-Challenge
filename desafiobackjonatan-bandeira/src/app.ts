import './models/associations'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ringRoutes from './routes/ringRoutes';
import sequelize from './config/database';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/rings', ringRoutes);

app.listen(port, async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
