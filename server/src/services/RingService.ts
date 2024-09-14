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

  public getForgedByOptions(): string[] {
    return Object.values(ForgedBy);
  }

  async create(createRingDTO: CreateRingDTO): Promise<Ring> {
    const { name, power, owner, forgedBy, image } = createRingDTO;
    try {
      const ringCount =
        await this.ringRepository.countRingsByForgedBy(forgedBy);
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
      return await this.ringRepository.save(ring);
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error creating ring:', error);
      throw new Error('Erro ao criar o anel.');
    }
  }

  async list(): Promise<Ring[]> {
    try {
      return await this.ringRepository.find();
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error listing rings:', error);
      throw new Error('Erro ao listar os anéis.');
    }
  }

  async get(id: string): Promise<Ring> {
    try {
      return await this.ringRepository.findOneByOrFail({ id });
    } catch (error) {
      // Log the error or handle it as needed
      console.error(`Error fetching ring with id ${id}:`, error);
      throw new Error(`Erro ao buscar o anel com id ${id}.`);
    }
  }

  async update(id: string, updateData: Partial<Ring>): Promise<Ring> {
    try {
      await this.ringRepository.update(id, updateData);
      return await this.ringRepository.findOneByOrFail({ id });
    } catch (error) {
      // Log the error or handle it as needed
      console.error(`Error updating ring with id ${id}:`, error);
      throw new Error(`Erro ao atualizar o anel com id ${id}.`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.ringRepository.delete(id);
    } catch (error) {
      // Log the error or handle it as needed
      console.error(`Error deleting ring with id ${id}:`, error);
      throw new Error(`Erro ao deletar o anel com id ${id}.`);
    }
  }
}
