import { Document, Schema, model, ObjectId } from 'mongoose';


export interface Rings extends Document {
  _id: ObjectId; 
  ringName: string;
  powerName: string;
  ownerName: string;
  builtBy: string;
  imageUrl: string;
}

// schema do Mongoose
const RingSchema: Schema<Rings> = new Schema({
  ringName: { type: String, required: true },
  powerName: { type: String, required: true },
  ownerName: { type: String, required: true },
  builtBy: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

// Cria o modelo do Mongoose
export const RingModel = model<Rings>('Rings', RingSchema);
