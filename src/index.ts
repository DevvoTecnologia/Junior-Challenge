import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware para lidar com JSON
app.use(express.json());

// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
