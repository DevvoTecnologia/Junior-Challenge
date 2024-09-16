import { model, Schema } from 'mongoose';
import { RingType } from 'types';

interface IAnel {
  nome: string;
  poder: string;
  portador: Schema.Types.ObjectId;
  forjadoPor: string;
  imagem: string;
  tipo: string;
}

const ringSchema = new Schema({
  nome: {
    type: String,
    trim: true,
    required: [true, 'Nome é obrigatório'],
    minLength: 4,
  },
  poder: {
    type: String,
    trim: true,
    required: [true, 'Poder é obrigatório'],
    minLength: 4,
  },
  portador: { type: Schema.Types.ObjectId, ref: 'Portador', required: true },
  forjadoPor: {
    type: String,
    trim: true,
    required: [true, 'Nome do Forjador é obrigatório'],
    minLength: 4,
  },
  imagem: { type: String, trim: true, required: true },
  tipo: {
    type: String,
    trim: true,
    enum: Object.values(RingType),
    required: true,
  },
});

ringSchema.pre('save', async function (this: IAnel, next) {
  const anel = this;
  const Anel = model<IAnel>('Anel');

  const maxAnels: Record<string, number> = {
    Elfos: 3,
    Anões: 7,
    Homens: 9,
    Sauron: 1,
  };

  const count = await Anel.countDocuments({ tipo: anel.tipo });
  if (count >= maxAnels[anel.tipo]) {
    throw new Error(
      `Não é possível criar mais anéis para o tipo ${anel.tipo}. Limite de ${
        maxAnels[anel.tipo]
      } atingido.`
    );
  }

  next();
});

ringSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export const Ring = model('Anel', ringSchema);
