import { Schema, Document, model } from "mongoose";

export enum Forjador {
  ELFOS = "Elfos",
  ANOES = "Anões",
  HOMENS = "Homens",
  SAURON = "Sauron",
}

export interface IRing extends Document {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: Forjador;
  imagem: string;
}

const ringSchema = new Schema<IRing>(
  {
    nome: { type: String, required: true },
    poder: { type: String, required: true },
    portador: { type: String, required: true },
    forjadoPor: { type: String, enum: Object.values(Forjador), required: true },
    imagem: { type: String, required: true },
  },
  {
    collection: "rings",
  }
);

const Ring = model<IRing>("rings", ringSchema);

export default Ring;
