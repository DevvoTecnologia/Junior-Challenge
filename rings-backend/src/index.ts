import { env } from '@config/env';
import { bearersRouter } from '@controllers/bearers';
import { loginRouter } from '@controllers/login';
import { ringsRouter } from '@controllers/rings';
import { usersRouter } from '@controllers/users';
import { error, info } from '@utils/logger';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';

mongoose.set('strictQuery', true);
mongoose
  .connect(env.mongodbUri)
  .then(() => {
    const app = express();

    app.use(express.static('dist'));
    app.use(cors());
    app.use(express.json());
    app.use(loginRouter);
    app.use(ringsRouter);
    app.use(bearersRouter);
    app.use(usersRouter);

    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );

    app.listen(env.port, () => {
      info(`🚀 Server is running on http://localhost:${env.port}`);
      info('connected to mongodb');
    });
  })
  .catch((err) => error('error connecting to mongodb', err.message));
