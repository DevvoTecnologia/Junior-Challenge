import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { env } from './lib/env';

const app = express();

app.use(express.json());
app.use(cors({ origin: env.CLIENT_URL }));
app.use(router);

app.listen(8080, () => console.log('Servidor na porta 8080!'));
