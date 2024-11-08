import mongoose from 'mongoose';

const portadorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  etnia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etnia',
    required: true,
  },
});

const Portador = mongoose.model('Portador', portadorSchema);

export default Portador;
