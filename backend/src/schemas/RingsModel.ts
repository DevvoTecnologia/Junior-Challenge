import { ObjectId, Schema, model, Types } from "mongoose";

export type Ring = {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: "Elfos" | "Anões" | "Homens" | "Sauron";
  imagem?: string;
};

const ringSchema = new Schema<Ring>(
  {
    nome: {
      type: String,
      required: true,
    },
    poder: {
      type: String,
      required: true,
    },
    portador: {
      type: String,
      required: true,
    },
    forjadoPor: {
      type: String,
      required: true,
      enum: ["Sauron", "Elfos", "Anões", "Homens"],
    },
    imagem: {
      type: String,
    },
  },
  { timestamps: true, optimisticConcurrency: true }
);

const RingModel = model("Ring", ringSchema);

export default RingModel;
