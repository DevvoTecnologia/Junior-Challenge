import { Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { Forger } from '../forgers/forger.entity';
import { createRingDTO } from './ring.dto';
import { Ring } from './ring.entity';
import { UpdateARing } from './types';

@Injectable()
export class RingsRepository extends Repository<Ring> {
  constructor(private dataSource: DataSource) {
    super(Ring, dataSource.createEntityManager());
  }

  async createARing(data: createRingDTO): Promise<Ring> {
    return await this.save(data);
  }

  async updateARing({ id, data }: UpdateARing): Promise<UpdateResult> {
    return await this.update(id, data);
  }

  async deleteARing(id: number): Promise<UpdateResult> {
    return await this.softDelete(id);
  }

  async listRingsByForge(forger: Forger): Promise<Ring[]> {
    const rings = await this.find({
      where: {
        forger: {
          forger_id: forger.forger_id,
        },
      },
    });
    return rings;
  }

  async listRings(): Promise<Ring[]> {
    return await this.find({
      relations: {
        carrier: true,
        forger: true,
      },
      where: {
        deleted_at: null,
      },
    });
  }

  async showARing(id: number): Promise<Ring> {
    return await this.findOne({
      where: {
        ring_id: id,
        deleted_at: null,
      },
      relations: {
        forger: true,
        carrier: true,
      },
    });
  }
}
