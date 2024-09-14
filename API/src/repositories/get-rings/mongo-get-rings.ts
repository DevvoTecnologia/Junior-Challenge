// src/repositories/mongo-get-rings-repository.ts
import { IGetRingsRepository } from '../repositories';
import { Rings } from '../../models/rings';
import { RingModel } from '../../models/rings';

export class MongoGetRingsRepository implements IGetRingsRepository {
  async getRingById(id: string): Promise<Rings | null> {
    try {
      // Busca um anel pelo ID
      const ring = await RingModel.findById(id).exec();
      return ring;
    } catch (error) {
      console.error('Error getting ring by ID:', error);
      throw new Error('Error getting ring by ID');
    }
  }

  async getRings(): Promise<Rings[]> {
    try {
      // Busca todos os anéis
      const rings = await RingModel.find().exec();
      return rings;
    } catch (error) {
      console.error('Error getting rings:', error);
      throw new Error('Error getting rings');
    }
  }
}
