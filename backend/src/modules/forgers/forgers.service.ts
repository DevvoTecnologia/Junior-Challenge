import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from 'src/utils/CustomException';
import { Repository } from 'typeorm';
import { Forger } from './forger.entity';

@Injectable()
export class ForgersService {
  constructor(
    @InjectRepository(Forger)
    private readonly forgerRepository: Repository<Forger>,
  ) {}

  async createAForger({
    name,
    max_forge,
  }: {
    name: string;
    max_forge: number;
  }): Promise<Forger> {
    return await this.forgerRepository.save({
      forger_name: name,
      forger_max_forge: max_forge,
    });
  }

  async getForgerById(id: number): Promise<Forger | null> {
    const forger = await this.forgerRepository.findOneBy({
      forger_id: id,
    });
    if (!forger) {
      throw new CustomException({
        errorCode: 'FORGER NOT FOUND',
        errorDescription: 'forger not found',
        statusCode: 400,
      });
    }
    return forger;
  }

  async getForgerByName(name: string): Promise<Forger | null> {
    return await this.forgerRepository.findOneBy({
      forger_name: name,
    });
  }
}
