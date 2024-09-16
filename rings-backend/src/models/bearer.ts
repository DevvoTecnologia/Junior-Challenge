import { model, Schema } from 'mongoose';

const bearerSchema = new Schema({
  nome: {
    type: String,
    trim: true,
    required: [true, 'Nome é obrigatório'],
    minLength: 3,
  },
  historia: { type: String },
  aneis: [{ type: Schema.Types.ObjectId, ref: 'Anel' }],
});

bearerSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export const Bearer = model('Portador', bearerSchema);
