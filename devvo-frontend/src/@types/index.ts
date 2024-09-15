export type Forger = "HOMEM" | "SAURON" | "ELFO" | "ANAO";

export enum EForger {
  HOMEM = "HOMEM",
  SAURON = "SAURON",
  ELFO = "ELFO",
  ANAO = "ANAO",
}

export type RingType = {
  carrier: {
    id: string;
    name: string;
  } | null;
  id: string;
  name: string;
  power: string;
  carrierId: string | null;
  forgedBy: Forger;
  image: string;
};
