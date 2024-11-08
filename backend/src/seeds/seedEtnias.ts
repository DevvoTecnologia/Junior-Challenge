import Etnia from '../models/Etnia';
const connectDB = require('../config/database');

const seedEtnias = async () => {
  await connectDB();

  const etnias = [
    { nome: 'Elfo', limitAneis: 3 },
    { nome: 'Anão', limitAneis: 7 },
    { nome: 'Humano', limitAneis: 9 },
    { nome: 'Sauron', limitAneis: 1 },
  ];

  try {
    const count = await Etnia.countDocuments();

    if (count > 0) {
      console.log('Etnias já cadastradas. Seed não será executado.');
      return;
    }
    await Etnia.insertMany(etnias);
    console.log('Seed de etnias criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar seed de etnias:', error);
  }
};

module.exports = seedEtnias;
