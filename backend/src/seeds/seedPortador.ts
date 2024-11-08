import Portador from '../models/Portador';
import Etnia from '../models/Etnia';

const connectDB = require('../config/database');

const seedPortadores = async () => {
  await connectDB();

  const etnias = await Etnia.find();

  const portadores = [
    { nome: 'Aragorn', idade: 35, etnia: etnias[0]._id },
    { nome: 'Gimli', idade: 120, etnia: etnias[1]._id },
    { nome: 'Legolas', idade: 150, etnia: etnias[0]._id },
    { nome: 'Frodo', idade: 33, etnia: etnias[1]._id },
    { nome: 'Boromir', idade: 40, etnia: etnias[2]._id },
    { nome: 'Gollum', idade: 500, etnia: etnias[0]._id },
    { nome: 'Arwen', idade: 120, etnia: etnias[0]._id },
    { nome: 'Sam', idade: 38, etnia: etnias[2]._id },
    { nome: 'Merry', idade: 36, etnia: etnias[3]._id },
    { nome: 'Pippin', idade: 34, etnia: etnias[3]._id },
  ];

  try {
    const count = await Portador.countDocuments();

    if (count > 0) {
      console.log('Portadores já cadastrados. Seed não será executado.');
      return;
    }

    await Portador.insertMany(portadores);
    console.log('Seed de portadores criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar seed de portadores:', error);
  }
};

module.exports = seedPortadores;
