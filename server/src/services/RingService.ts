// src/services/RingService.ts
import { IRingRepository } from '../repositories/interfaces/IRingRepository';
import { Ring, ForgedBy } from '../entities/Ring';
import { CreateRingDTO } from '../dtos/CreateRingDTO';

const LIMITS = {
  [ForgedBy.ELVES]: 3,
  [ForgedBy.DWARVES]: 7,
  [ForgedBy.MEN]: 9,
  [ForgedBy.SAURON]: 1,
};

export class RingService {
  private ringRepository: IRingRepository;

  constructor(ringRepository: IRingRepository) {
    this.ringRepository = ringRepository;
  }

  async create({
    name,
    power,
    owner,
    forgedBy,
    image,
  }: CreateRingDTO): Promise<Ring> {
    const ringCount = await this.ringRepository.countRingsByForgedBy(forgedBy);
    const maxLimit = LIMITS[forgedBy];

    if (ringCount >= maxLimit) {
      throw new Error(`Limite máximo de anéis para ${forgedBy} atingido.`);
    }

    const ring = this.ringRepository.create({
      name,
      power,
      owner,
      forgedBy,
      image,
    });
    return this.ringRepository.save(ring);
  }

  async list(): Promise<Ring[]> {
    return this.ringRepository.find();
  }

  async get(id: string): Promise<Ring> {
    return this.ringRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateData: Partial<Ring>): Promise<Ring> {
    await this.ringRepository.update(id, updateData);
    return this.ringRepository.findOneByOrFail({ id });
  }

  async delete(id: string): Promise<void> {
    await this.ringRepository.delete(id);
  }
}
