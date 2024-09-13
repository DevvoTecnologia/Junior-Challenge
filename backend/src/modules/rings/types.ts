import { Carrier } from '../carriers/carrier.entity';
import { Forger } from '../forgers/forger.entity';
import { createRingDTO } from './ring.dto';

export interface Dependencies {
  carrier_id: number;
  forger_id: number;
}

export interface DependenciesReturn {
  carrier: Carrier;
  forger: Forger;
}

export interface CheckMaxForge {
  forger: Forger;
  condition: boolean;
}

export interface UpdateARing {
  id: number;
  data: createRingDTO;
}
