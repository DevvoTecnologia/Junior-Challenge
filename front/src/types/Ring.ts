// src/types/Ring.ts

export interface Ring {
  id: number;
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  image: string;
}

export interface CreateRingType {
  name: string;
  power: string;
  image: string;
}
