import { Forgers } from './Forgers';

export interface Ring {
  id: string;
  name: string;
  power: string;
  bearer: string;
  forgedBy: Forgers;
  image: string;
}
