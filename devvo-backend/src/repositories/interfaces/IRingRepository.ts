import { Ring } from "../../domain/entities/Ring";

export interface IRingRepository {
  create(ring: Ring): Promise<Ring>;
  findAll(): Promise<Ring[]>;
  findById(id: number): Promise<Ring | null>;
  update(id: number, ringData: Partial<Ring>): Promise<Ring>;
  delete(id: number): Promise<void>;
}
