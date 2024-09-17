import { AppDataSource } from '../database/data-source';
import { Ring } from '../models/Ring';
import { Repository } from 'typeorm';
import { ringLimitAllowed } from '../utils/validation';

export class RingService {
  private ringRepository: Repository<Ring>;

  constructor() {
    this.ringRepository = AppDataSource.getRepository(Ring);
  }

  public async listRings(): Promise<Ring[]> {
    return await this.ringRepository.find({
      order: {
        createdAt: "DESC"
      }
    });
  }

  public async getRing(id: string): Promise<Ring> {
    return await this.ringRepository.findOneByOrFail({ id });
  }

  public async createRing(ringData: Ring): Promise<Ring> {
    const maxAllowed = await ringLimitAllowed(ringData);

    if (maxAllowed) {
      throw new Error('Excedido número de anéis!');
    }

    const createdAt = new Date();
    const ring = this.ringRepository.create({ ...ringData, createdAt });

    return await this.ringRepository.save(ring);
  }

  public async updateRing(id: string, updates: Ring): Promise<Ring> {
    const maxAllowed = await ringLimitAllowed(updates);

    if (maxAllowed) {
      throw new Error('Excedido número de anéis!');
    }
    await this.ringRepository.update(id, updates);

    return this.ringRepository.findOneByOrFail({ id });
  }

  public async deleteRing(id: string): Promise<void> {
    const ring = await this.ringRepository.findOneBy({ id });
    if (!ring) {
      throw new Error('Anel não encontrado.');
    }

    await this.ringRepository.delete(id);
  }
}
