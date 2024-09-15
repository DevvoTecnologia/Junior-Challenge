import { Carrier } from './Carrier';
import { Forger } from "./Forger";

export interface Ring {
  ring_id: number;
  ring_name: string;
  ring_image: string;
  ring_power: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface CompleteRing extends Ring {
  forger: Forger,
  carrier: Carrier
}