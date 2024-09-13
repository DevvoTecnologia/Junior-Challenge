import { Repository } from 'typeorm';
import dbClient from '../config/database';
import { Owner } from '../models/Owner';

export class OwnerService {
  private ownerRepository: Repository<Owner> = dbClient.getRepository(Owner);

  async findOrCreateOwner(ownerData: Omit<Owner, 'id' | 'rings'>): Promise<Owner> {
    const existingOwner = await this.ownerRepository.findOne({
      where: { name: ownerData.name },
      relations: ['rings'],
    });

    if (existingOwner) {
      return existingOwner;
    }

    const newOwner = this.ownerRepository.create(ownerData);
    return this.ownerRepository.save(newOwner);
  }

  async checkAndDeleteOwner(ownerId: number): Promise<void> {
    const owner = await this.ownerRepository.findOne({
      where: { id: ownerId },
      relations: ['rings'],
    });

    if (owner && owner.rings.length === 0) {
      await this.ownerRepository.remove(owner);
    }
  }
}
