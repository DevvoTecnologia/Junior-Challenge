import mongoose from 'mongoose';

const EtniaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  limitAneis: {
    type: Number,
    required: true,
  },
});

const Etnia = mongoose.model('Etnia', EtniaSchema);
export default Etnia;
