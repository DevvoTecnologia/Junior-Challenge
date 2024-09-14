import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import ringRoutes from './routes/ringRoutes'; 
import authRoutes from './routes/authRoutes';
import { AppDataSource } from './data-source';
import { authenticateToken } from './middlewares/authMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados');

    app.use('/auth', authRoutes);

    app.use('/rings', authenticateToken, ringRoutes);

    app.listen(3001, () => {
      console.log('Servidor rodando na porta 3001');
    });
  })
  .catch((error) => console.log(error));
