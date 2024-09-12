import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from 'src/utils/CustomException';
import { Repository } from 'typeorm';
import { Carrier } from './carrier.entity';

@Injectable()
export class CarriersService {
  constructor(
    @InjectRepository(Carrier)
    private readonly carrierRepository: Repository<Carrier>,
  ) {}

  async createACarrier(name: string): Promise<Carrier> {
    return await this.carrierRepository.save({
      carrier_name: name,
    });
  }

  async getCarrierById(id: number): Promise<Carrier | null> {
    if (!id) {
      return null;
    }

    const carrier = await this.carrierRepository.findOneBy({
      carrier_id: id,
    });

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
    return await this.carrierRepository.findOneBy({
      carrier_name: name,
    });
  }
}
