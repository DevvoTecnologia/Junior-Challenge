import mongoose, { Document, Schema } from "mongoose";

export interface RingProps extends Document {
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  imageUrl: string;
}

const ringSchema: Schema = new Schema({
  name: { type: String, required: true },
  power: { type: String, required: true },
  bearer: { type: String, required: true },
  forgedBy: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Ring = mongoose.model<RingProps>("Ring", ringSchema);

export default Ring;
