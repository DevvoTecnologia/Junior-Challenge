import { Repository } from 'typeorm';
import dbClient from '../config/database';
import { Owner } from '../models/Owner';
import { Ring } from '../models/Ring';
import { ConflictError, NotFoundError } from '../utils/errors';
import { OwnerService } from './OwnerService';

const RING_LIMITS = {
  Elfos: 3,
  Anões: 7,
  Humanos: 9,
  Sauron: 1,
};

export class RingService {
  private ringRepository: Repository<Ring> = dbClient.getRepository(Ring);

  constructor(private ownerService: OwnerService) {}

  async createRingWithOwner(
    ringData: Omit<Ring, 'id' | 'currentOwner'>,
    ownerData: Omit<Owner, 'id' | 'rings'>,
  ): Promise<Ring> {
    const { forgedBy } = ringData;
    const isRingLimitValid = await this.validateRingLimit(forgedBy);

    if (!isRingLimitValid) {
      throw new ConflictError(`Ring limit exceeded for ${forgedBy}`);
    }

    const owner = await this.ownerService.findOrCreateOwner(ownerData);

    const ring = this.ringRepository.create({
      ...ringData,
      currentOwner: owner,
    });

    return this.ringRepository.save(ring);
  }

  async getAllRings(): Promise<Ring[]> {
    return this.ringRepository.find({ relations: ['currentOwner'] });
  }

  async updateRing(ringId: number, ringData: Partial<Ring>): Promise<Ring> {
    const ring = await this.ringRepository.findOne({
      where: { id: ringId },
      relations: ['currentOwner'],
    });

    if (!ring) {
      throw new NotFoundError(`Ring with id ${ringId} not found`);
    }

    if (ringData.currentOwner && ringData.currentOwner.name !== ring.currentOwner.name) {
      const newOwner = await this.ownerService.findOrCreateOwner(ringData.currentOwner);
      ring.currentOwner = newOwner;
    }

    Object.assign(ring, ringData);

    return this.ringRepository.save(ring);
  }

  async deleteRing(ringId: number): Promise<void> {
    const ring = await this.ringRepository.findOne({
      where: { id: ringId },
      relations: ['currentOwner'],
    });

    if (!ring) {
      throw new NotFoundError(`Ring with id ${ringId} not found`);
    }

    await this.ringRepository.remove(ring);
    await this.ownerService.checkAndDeleteOwner(ring.currentOwner.id);
  }

  async validateRingLimit(forgedBy: Ring['forgedBy']): Promise<boolean> {
    const count = await this.ringRepository.count({ where: { forgedBy } });
    return count <= RING_LIMITS[forgedBy];
  }
}
