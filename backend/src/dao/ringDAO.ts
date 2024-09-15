import { DataSource } from 'typeorm';
import { Ring } from '../models/Ring';

export class RingDAO {
  private repository = this.dataSource.getRepository(Ring);

  constructor(private dataSource: DataSource) {}

  async create(data: Omit<Ring, 'id'>): Promise<Ring> {
    const ring = this.repository.create(data);
    return await this.repository.save(ring);
  }

  async findAll(): Promise<Ring[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Ring | null> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, data: Partial<Omit<Ring, 'id'>>): Promise<Ring | null> {
    await this.repository.update(id, data);
    return await this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}