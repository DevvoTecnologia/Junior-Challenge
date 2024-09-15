import { Injectable } from '@nestjs/common';
import { CustomException } from './../../utils/CustomException';
import { createForgerDTO } from './forger.dto';
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
        statusCode: 404,
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
        statusCode: 404,
      });
    }
    return forger;
  }

  async showAForger(id: number): Promise<Forger> {
    const forger = await this.repository.showAForger(id);

    if (!forger) {
      throw new CustomException({
        errorCode: 'FORGER NOT FOUND',
        errorDescription: 'FORGER not found',
        statusCode: 404,
      });
    }
    return forger;
  }

  async listForgers(): Promise<Forger[]> {
    return await this.repository.listForgers();
  }

  async updateAForger(
    id: number,
    data: createForgerDTO,
  ): Promise<{ message: string }> {
    const { forger_max_forge, forger_name } = data;

    const forger = await this.showAForger(id);

    forger.forger_name = forger_name;
    forger.forger_max_forge = forger_max_forge;
    forger.updated_at = new Date();

    try {
      await this.repository.updateAForger(id, forger);
      return {
        message: 'Forger updated',
      };
    } catch (e) {
      throw new CustomException({
        errorCode: 'ERROR TO UPDATE',
        errorDescription: 'Error to update this forger',
        statusCode: 400,
      });
    }
  }

  async deleteAForger(id: number): Promise<{ message: string }> {
    const forger = await this.showAForger(id);

    try {
      await this.repository.deleteAForger(forger.forger_id);
      return {
        message: 'Forger deleted',
      };
    } catch (e) {
      throw new CustomException({
        errorCode: 'ERROR TO DELETE',
        errorDescription: 'Error to delete this forger',
        statusCode: 400,
      });
    }
  }
}
