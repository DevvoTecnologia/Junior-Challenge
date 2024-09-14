// src/repositories/implementations/RingRepository.ts
import { IRingRepository } from './interfaces/IRingRepository';
import { Ring, ForgedBy } from '../entities/Ring';
import { AppDataSource } from '../database/data-source';

export class RingRepository implements IRingRepository {
  private repository = AppDataSource.getRepository(Ring);

  async countRingsByForgedBy(forgedBy: ForgedBy): Promise<number> {
    return this.repository.count({ where: { forgedBy } });
  }

  create(ring: Partial<Ring>): Ring {
    return this.repository.create(ring);
  }

  async save(ring: Ring): Promise<Ring> {
    return this.repository.save(ring);
  }

  async find(): Promise<Ring[]> {
    return this.repository.find();
  }

  async update(id: string, updateData: Partial<Ring>): Promise<void> {
    await this.repository.update(id, updateData);
  }

  async findOneByOrFail(condition: Partial<Ring>): Promise<Ring> {
    return this.repository.findOneByOrFail(condition);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
