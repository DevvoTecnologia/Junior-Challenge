import { IBearer } from './IBearer';

export interface IRing {
  _id?: string;
  nome: string;
  poder: string;
  portador: string | IBearer;
  forjadoPor: string;
  imagem: string | File;
  tipo: string;
}
