import { AppDataSource } from "../config/database";
import { IRingRepository } from "./interfaces/IRingRepository";
import { Ring } from "../domain/entities/Ring";

export class RingRepository implements IRingRepository {
  private ringRepository = AppDataSource.getRepository(Ring);

  async create(ring: Ring): Promise<Ring> {
    return this.ringRepository.save(ring);
  }

  async findAll(): Promise<Ring[]> {
    return this.ringRepository.find();
  }

  async findById(id: number): Promise<Ring | null> {
    return this.ringRepository.findOneBy({ id });
  }

  async update(id: number, ringData: Partial<Ring>): Promise<Ring> {
    await this.ringRepository.update(id, ringData);
    return (await this.findById(id))!;
  }

  async delete(id: number): Promise<void> {
    await this.ringRepository.delete(id);
  }
}
