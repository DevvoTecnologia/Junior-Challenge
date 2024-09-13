import { Forjador } from "../utils/Forjador";

export interface RingData {
  _id: string | null;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: Forjador;
  imagem: string;
}

export interface RingDataCreate {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: Forjador;
  imagem: string;
}
