import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.use((req, res, next) => {
  if (req.method !== 'GET' && !req.is('json')) {
    return res.status(415).send('Content-Type must be application/json');
  }
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

export default app;
