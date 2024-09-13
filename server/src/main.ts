import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './database/data-source';
import { routes } from './routes';
import { errorHandler } from './middlewares/ErrorHandler';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());

    app.use(errorHandler);
    app.use(routes);

    const PORT = process.env.SERVER_PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.log(error));
