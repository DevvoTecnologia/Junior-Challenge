import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ringRoutes from "./routes/RingRoutes";
import forjadorRoutes from './routes/ForjadorRoutes';
import { AppDataSource } from "./config/database";

dotenv.config();

const app = express();
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida!");
  })
  .catch((error) => console.log("Erro ao conectar ao banco de dados", error));

  app.use('/api', ringRoutes);
  app.use('/api', forjadorRoutes);

export default app;
