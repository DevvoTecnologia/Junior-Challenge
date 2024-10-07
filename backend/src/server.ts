import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { sequelize } from './db';
import ringRoutes from './routes/ringRoutes';

const app = express();
app.use(cors());
app.use(json());

app.use('/rings', ringRoutes);

const PORT = process.env.DB_PORT || 3000;

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

testConnection();

