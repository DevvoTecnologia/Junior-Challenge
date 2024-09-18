import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { env } from './app/env';
import { routes } from './app/routes';
import { AppDataSource } from './app/database/data-source';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

AppDataSource.initialize().then(async () => {

  app.listen(env.API_PORT, () => {
    console.log(`listening on port ${env.API_PORT}`);
  });
});
