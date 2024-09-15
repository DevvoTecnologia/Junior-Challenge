import { Ring } from "../entities/Rings";

export interface IRingService {
  createRing(data: RingData): Promise<Ring>;
  getAllRings(): Promise<Ring[]>;
  updateRing(id: number, data: RingData): Promise<Ring>;
  deleteRing(id: number): Promise<void>;
}
