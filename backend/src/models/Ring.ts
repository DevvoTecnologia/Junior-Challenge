import { Schema, model } from "mongoose";

const ringSchema = new Schema({
  nome: { type: String, required: true },
  poder: { type: String, required: true },
  portador: { type: String, required: true },
  forjadoPor: { type: String, required: true },
  imagem: { type: String, required: true }
});

export const Ring = model("Ring", ringSchema);
