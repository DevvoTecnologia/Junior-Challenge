import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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
    });
  }

  async getCarrierByName(name: string): Promise<Carrier | null> {
    return await this.findOneBy({
      carrier_name: name,
    });
  }
}
