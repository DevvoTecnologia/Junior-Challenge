import { Injectable } from '@nestjs/common';
import { CustomException } from './../../utils/CustomException';
import { Carrier } from './carrier.entity';
import { CarriersRepository } from './carriers.repository';

@Injectable()
export class CarriersService {
  constructor(private repository: CarriersRepository) {}

  async createACarrier(name: string): Promise<Carrier> {
    return await this.repository.createACarrier(name);
  }

  async getCarrierById(id: number): Promise<Carrier | null> {
    if (!id) {
      return null;
    }

    const carrier = await this.repository.getCarrierById(id);

    if (!carrier) {
      throw new CustomException({
        errorCode: 'CARRIER NOT FOUND',
        errorDescription: 'carrier not found',
        statusCode: 400,
      });
    }
    return carrier;
  }

  async getCarrierByName(name: string): Promise<Carrier | null> {
    const carrier = await this.repository.getCarrierByName(name);

    if (!carrier) {
      throw new CustomException({
        errorCode: 'CARRIER NOT FOUND',
        errorDescription: 'carrier not found',
        statusCode: 400,
      });
    }
    return carrier;
  }
}
