import { Document, Schema, model, Types } from 'mongoose';

export interface Rings extends Document {
  _id: Types.ObjectId;
  ringName: string;
  powerName: string;
  ownerName: string;
  builtBy: string;
  imageUrl: string;
}

const RingSchema: Schema<Rings> = new Schema({
  ringName: { type: String, required: true },
  powerName: { type: String, required: true },
  ownerName: { type: String, required: true },
  builtBy: { type: String, required: true },
  imageUrl: { type: String, },
});

export const RingModel = model<Rings>('Rings', RingSchema);
