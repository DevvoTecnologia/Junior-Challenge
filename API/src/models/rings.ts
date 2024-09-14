import { Document, Schema, model } from 'mongoose';

// Define o tipo Rings estendendo o Document do Mongoose
export interface Rings extends Document {
  ringName: string;
  powerName: string;
  ownerName: string;
  builtBy: string;
  imageUrl: string;
}

// Define o schema do Mongoose
const RingSchema: Schema = new Schema({
  ringName: { type: String, required: true },
  powerName: { type: String, required: true },
  ownerName: { type: String, required: true },
  builtBy: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

// Cria o modelo do Mongoose
export const RingModel = model<Rings>('Rings', RingSchema);
