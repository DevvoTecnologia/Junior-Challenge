import { Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { createCarrierDTO } from './carrier.dto';
import { Carrier } from './carrier.entity';

@Injectable()
export class CarriersRepository extends Repository<Carrier> {
  constructor(private dataSource: DataSource) {
    super(Carrier, dataSource.createEntityManager());
  }

  async createACarrier(name: string): Promise<Carrier> {
    return await this.save({
      carrier_name: name,
    });
  }

  async getCarrierById(id: number): Promise<Carrier | null> {
    return await this.findOneBy({
      carrier_id: id,
      deleted_at: null
    });
  }

  async getCarrierByName(name: string): Promise<Carrier | null> {
    return await this.findOneBy({
      carrier_name: name,
      deleted_at: null
    });
  }

  async showACarrier(id: number): Promise<Carrier>{
    return await this.findOne({
      where: {
        carrier_id: id,
        deleted_at: null,
      },
    });
  }

  async listCarriers(): Promise<Carrier[]>{
    return await this.find({
      where: {
        deleted_at: null
      }
    });
  }

  async updateACarrier(id: number, data: createCarrierDTO): Promise<UpdateResult>{
    return await this.update(id, data);
  }

  async deleteACarrier(id: number): Promise<UpdateResult>{
    return await this.softDelete(id);
  } 
}
