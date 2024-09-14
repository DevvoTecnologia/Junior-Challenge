import express from 'express';
import cors from 'cors';
import { json } from 'express'; 
import routes from './routes';
import { sequelize } from './config/database'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use('/api', routes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync();
    console.log('Banco de dados sincronizado.');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

startServer();

export default app;
