import { Class } from '@prisma/client';

export interface ResponseRing {
  id: number;
  name: string;
  power: string;
  carrier: string;
  forgedBy: Class;
  image: string;
  created_at?: Date;
  updated_at?: Date;
};