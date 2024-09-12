import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Servidor Online!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
