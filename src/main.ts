import express, { Request, Response } from 'express';
import { Router } from 'express';

const app = express();
const route = Router();

app.use(express.json());

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello world' });
});

app.use(route);

const PORT = 3030;

const startServer = () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

export { app, startServer };
