import mongoose, { Document, Schema } from "mongoose";

enum ForgedBy {
  Elves = "Elves",
  Dwarves = "Dwarves",
  Men = "Men",
  Sauron = "Sauron",
}

export interface IRing extends Document {
  name: string;
  power: string;
  holder: number;
  forgedBy: ForgedBy;
  image: string;
}

const RingSchema: Schema = new Schema({
  name: { type: String, required: true },
  power: { type: String, required: true },
  holder: { type: String, required: true },
  forgedBy: { type: String, enum: Object.values(ForgedBy), required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IRing>("Ring", RingSchema);
