import { Injectable } from '@nestjs/common';
import { CustomException } from './../../utils/CustomException';
import { Forger } from './forger.entity';
import { ForgersRepository } from './forgers.repository';

interface CreateAForge {
  name: string;
  max_forge: number;
}

@Injectable()
export class ForgersService {
  constructor(private repository: ForgersRepository) {}

  async createAForger({ name, max_forge }: CreateAForge): Promise<Forger> {
    return await this.repository.createAForger({
      name,
      max_forge,
    });
  }

  async getForgerById(id: number): Promise<Forger | null> {
    const forger = await this.repository.getForgerById(id);

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
    const forger = await this.repository.getForgerByName(name);

    if (!forger) {
      throw new CustomException({
        errorCode: 'FORGER NOT FOUND',
        errorDescription: 'forger not found',
        statusCode: 400,
      });
    }
    return forger;
  }
}
