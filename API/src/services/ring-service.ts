import mongoose from 'mongoose';
import { CreateRingParams } from '../controllers/create-ring/protocols';
import { UpdateRingParams } from '../controllers/update-ring/protocols';
import { Rings } from '../models/rings';
import { ICreateRingRepository, IUpdateRingRepository, IDeleteRingRepository, IGetRingsRepository } from '../repositories/repositories';
import { IRingService } from './protocols';

export class RingService implements IRingService {
  constructor(
    private createRingRepo: ICreateRingRepository,
    private updateRingRepo: IUpdateRingRepository,
    private deleteRingRepo: IDeleteRingRepository,
    private getRingsRepo: IGetRingsRepository
  ) {}

  private isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }

  private async checkCreatorLimit(builtBy: string): Promise<void> {
    const limits: { [key: string]: number } = {
      'Elfos': 3,
      'Anões': 7,
      'Homens': 9,
      'Sauron': 1
    };

    const limit = limits[builtBy];

    if (limit === undefined) {
      throw new Error('Invalid creator');
    }

    const existingRings = await this.getRingsRepo.getRings();
    const count = existingRings.filter(ring => ring.builtBy === builtBy).length;

    if (count >= limit) {
      throw new Error(`O limite de anéis por ${builtBy} foi atingido`);
    }
  }

  async createRing(params: CreateRingParams): Promise<Rings> {
    const { builtBy, imageUrl } = params;

    const limits: { [key: string]: number } = {
      'Elfos': 3,
      'Anões': 7,
      'Homens': 9,
      'Sauron': 1
    };
  
    // liimite por forjador
    const limit = limits[builtBy];
  
    if (limit === undefined) {
      throw new Error('Criador inválido');
    }
  
    // anéis por forjador
    const existingRings = await this.getRingsRepo.getRings();
    const count = existingRings.filter(ring => ring.builtBy === builtBy).length;
  
    if (count >= limit) {
      throw new Error(`O limite de anéis por ${builtBy} foi atingido`);
    }
  
    // cria o anel
    const createdRing = await this.createRingRepo.createRing(params);
  
    // retorna o anel criado, incluindo imageUrl
    return createdRing;
  }
  

  async getRingById(id: string): Promise<Rings | null> {
    if (!this.isValidObjectId(id)) {
      throw new Error('Invalid ID format');
    }
    return this.getRingsRepo.getRingById(id);
  }

  async updateRing(id: string, params: UpdateRingParams): Promise<Rings | null> {
    if (!this.isValidObjectId(id)) {
      throw new Error('Invalid ID format');
    }
    return this.updateRingRepo.updateRing(id, params);
  }

  async deleteRing(id: string): Promise<Rings | null> {
    if (!this.isValidObjectId(id)) {
      throw new Error('Invalid ID format');
    }
    return this.deleteRingRepo.deleteRing(id);
  }

  async getRings(): Promise<Rings[]> {
    return this.getRingsRepo.getRings();
  }
}
