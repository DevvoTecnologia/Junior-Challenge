import express from 'express';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API com TypeScript funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});