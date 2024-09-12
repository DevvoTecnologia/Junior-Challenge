import express from 'express';
import userRoutes from './routes/userRoutes';
import './database'; // Configuração do TypeORM, garante que a conexão com o banco de dados seja estabelecida
import 'reflect-metadata'; // Necessário para TypeORM

const app = express();
app.use(express.json()); // Middleware para parsing de JSON

app.use('/api', userRoutes); // Configura as rotas

export default app;
