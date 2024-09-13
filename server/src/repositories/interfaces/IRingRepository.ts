// src/repositories/interfaces/IRingRepository.ts
import { Ring } from '../../entities/Ring';

export interface IRingRepository {
  countRingsByForgedBy(forgedBy: string): Promise<number>;
  create(ring: Partial<Ring>): Ring;
  save(ring: Ring): Promise<Ring>;
  find(): Promise<Ring[]>;
  update(id: string, updateData: Partial<Ring>): Promise<void>;
  findOneByOrFail(condition: Partial<Ring>): Promise<Ring>;
  delete(id: string): Promise<void>;
}
