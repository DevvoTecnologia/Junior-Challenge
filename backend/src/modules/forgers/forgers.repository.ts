import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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
    });
  }

  async getForgerByName(name: string): Promise<Forger | null> {
    return await this.findOneBy({
      forger_name: name,
    });
  }
}
