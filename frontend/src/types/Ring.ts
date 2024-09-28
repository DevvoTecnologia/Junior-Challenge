export interface Ring {
  id: number;
  name: string;
  power: string;
  owner: string;
  forgedBy: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  url: string;
}

export type Rings = Ring[];
