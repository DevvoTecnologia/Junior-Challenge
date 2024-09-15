import { Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { createForgerDTO } from './forger.dto';
import { Forger } from './forger.entity';

@Injectable()
export class ForgersRepository extends Repository<Forger> {
  constructor(private dataSource: DataSource) {
    super(Forger, dataSource.createEntityManager());
  }

  async createAForger({
    name,
    max_forge,
  }: {
    name: string;
    max_forge: number;
  }): Promise<Forger> {
    return await this.save({
      forger_name: name,
      forger_max_forge: max_forge,
    });
  }

  async getForgerById(id: number): Promise<Forger | null> {
    return await this.findOneBy({
      forger_id: id,
      deleted_at: null
    });
  }

  async getForgerByName(name: string): Promise<Forger | null> {
    return await this.findOneBy({
      forger_name: name,
      deleted_at: null
    });
  }

  async showAForger(id: number): Promise<Forger>{
    return await this.findOne({
      where: {
        forger_id: id,
        deleted_at: null,
      },
    });
  }

  async listForgers(): Promise<Forger[]>{
    return await this.find({
      where: {
        deleted_at: null
      }
    });
  }

  async updateAForger(id: number, data: createForgerDTO): Promise<UpdateResult>{
    return await this.update(id, data);
  }

  async deleteAForger(id: number): Promise<UpdateResult>{
    return await this.softDelete(id);
  } 
}
