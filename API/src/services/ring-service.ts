
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

  async createRing(params: CreateRingParams): Promise<Rings> {
    return this.createRingRepo.createRing(params);
  }

  async getRingById(id: string): Promise<Rings | null> {
    return this.getRingsRepo.getRingById(id);
  }

  async updateRing(id: string, params: UpdateRingParams): Promise<Rings | null> {
    return this.updateRingRepo.updateRing(id, params);
  }

  async deleteRing(id: string): Promise<Rings | null> {
    return this.deleteRingRepo.deleteRing(id);
  }

  async getRings(): Promise<Rings[]> {
    return this.getRingsRepo.getRings();
  }
}
