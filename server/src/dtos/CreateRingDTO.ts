import { ForgedBy } from '../entities/Ring';

export interface CreateRingDTO {
  name: string;
  power: string;
  owner: string;
  forgedBy: ForgedBy;
  image: string;
}
