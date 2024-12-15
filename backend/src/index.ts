import express from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import ringRoutes from './routes/ringRoutes';

import swaggerDocument from './swagger.json';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'; 

const app = express();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado!');
  })
  .catch((error) => console.error('Erro ao conectar no banco: ', error));

app.use(cors()); // Usei para habilitar o Cors
app.use(bodyParser.json());

// Rotas
app.use('/api', ringRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse a documentação em http://localhost:${PORT}/api-docs`);
});
