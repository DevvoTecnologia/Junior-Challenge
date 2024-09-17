import "reflect-metadata";
import express from 'express';
import dataSource from '../ormconfig'; 
import { setupSwagger } from "./swagger";
import cors from 'cors'
import path from "path";

import authRoutes from './routes/AuthRoutes';
import usuarioRoutes from './routes/UsuarioRoutes';
import aneisRoutes from './routes/AnelRoutes';
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type','Authorization'], 
};

    app.use(cors(corsOptions)); 
    dataSource.initialize().then(() => {
    console.log("Conexão com o banco de dados estabelecida!");
  
    app.use(express.json());
    setupSwagger(app);
  

    app.use('/auth', authRoutes);
    app.use('/api', authMiddleware,usuarioRoutes);
    app.use('/api', authMiddleware,aneisRoutes);
    app.use('/images', express.static(path.join(__dirname, '..', 'api', 'imgs')));
  
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  }).catch(error => console.log("Erro ao conectar ao banco de dados:", error));