import mongoose from 'mongoose';

const anelSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  poder: { type: String, required: true },
  forjadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etnia',
    required: true,
  },
  imagem_url: { type: String, required: true },
  portador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portador',
    required: true,
  },
});

const Anel = mongoose.model('Anel', anelSchema);

export interface IAnel extends Document {
  nome: string;
  poder?: string;
  forjadoPor?: string;
  imagem_url?: string;
  portador: mongoose.Schema.Types.ObjectId;
}

export default Anel;
