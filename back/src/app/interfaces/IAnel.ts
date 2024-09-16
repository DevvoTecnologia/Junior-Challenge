import { TipoForjador } from "../types/TipoForjador";

export interface IAnel {
  id?: number; // O campo `id` é gerado automaticamente e é um número
  name: string; // O campo `name` é uma string com comprimento máximo de 100 caracteres
  power: string; // O campo `power` é uma string com comprimento máximo de 100 caracteres
  holder: string; // O campo `holder` é uma string com comprimento máximo de 100 caracteres
  forger: TipoForjador; // O campo `forger` é um enum definido em TipoForjador
}
