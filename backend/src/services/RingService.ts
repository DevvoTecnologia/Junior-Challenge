import { Repository } from 'typeorm';
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
  constructor(private ringRepository: Repository<Ring>, private ownerService: OwnerService) {}

  private async validateRingLimit(forgedBy: Ring['forgedBy']): Promise<boolean> {
    const count = await this.ringRepository.count({ where: { forgedBy } });
    return count < RING_LIMITS[forgedBy];
  }

  private checkLimit = async (forgedBy) => {
    const isRingLimitValid = await this.validateRingLimit(forgedBy);

    if (!isRingLimitValid) {
      const limit = RING_LIMITS[forgedBy];
      const isPlural = limit > 1;
      const ringText = `O limite de ${isPlural ? 'anéis' : 'anel'} para ${forgedBy} é ${limit}.`;
      const instructionText = `Delete um anel forjado ${
        isPlural ? 'deles' : 'dele'
      } e tente novamente.`;

      throw new ConflictError(ringText + ' ' + instructionText);
    }
  };

  async createRingWithOwner(
    ringData: Omit<Ring, 'id' | 'currentOwner'>,
    ownerData: Omit<Owner, 'id' | 'rings'>,
  ): Promise<Ring> {
    const { forgedBy } = ringData;
    await this.checkLimit(forgedBy);

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

  async updateRing(
    ringId: number,
    updatedRingData: Omit<Ring, 'id' | 'currentOwner'>,
    updatedOwnerData: Omit<Owner, 'id' | 'rings'>,
  ): Promise<Ring> {
    const { forgedBy } = updatedRingData;

    const ring = await this.ringRepository.findOne({
      where: { id: ringId },
      relations: ['currentOwner'],
    });

    if (!ring) {
      throw new NotFoundError(`Anel não encontrado`);
    }

    if (ring.forgedBy !== forgedBy) {
      await this.checkLimit(forgedBy);
    }

    const currentOwnerName = ring.currentOwner.name;
    const currentOwnerID = ring.currentOwner.id;
    const hasNewOwner = currentOwnerName !== updatedOwnerData.name;

    if (hasNewOwner) {
      const newOwner = await this.ownerService.findOrCreateOwner(updatedOwnerData);
      ring.currentOwner = newOwner;
    }

    Object.assign(ring, updatedRingData);

    const updatedRing = await this.ringRepository.save(ring);
    this.ownerService.checkAndDeleteOwner(currentOwnerID);

    return updatedRing;
  }

  async deleteRing(ringId: number): Promise<void> {
    const ring = await this.ringRepository.findOne({
      where: { id: ringId },
      relations: ['currentOwner'],
    });

    if (!ring) {
      throw new NotFoundError(`Anel não encontrado`);
    }

    await this.ringRepository.remove(ring);
    await this.ownerService.checkAndDeleteOwner(ring.currentOwner.id);
  }
}
