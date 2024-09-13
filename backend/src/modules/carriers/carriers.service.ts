import { Injectable } from '@nestjs/common';
import { CustomException } from './../../utils/CustomException';
import { createCarrierDTO } from './carrier.dto';
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

  
  async showACarrier(id: number): Promise<Carrier>{
    const carrier = await this.repository.showACarrier(id);

    if (!carrier) {
      throw new CustomException({
        errorCode: 'CARRIER NOT FOUND',
        errorDescription: 'CARRIER not found',
        statusCode: 400,
      });
    }
    return carrier;
  }

  async listCarriers(): Promise<Carrier[]>{
    return await this.repository.listCarriers();
  }

  async updateACarrier(id: number, data: createCarrierDTO): Promise<{message: string}>{
    const { carrier_name } = data;

    const carrier = await this.showACarrier(id);

    carrier.carrier_name = carrier_name;
    carrier.updated_at = new Date();

    try {
      await this.repository.updateACarrier(id, carrier);
      return {
        message: 'Carrier updated',
      };
    } catch (e) {
      throw new CustomException({
        errorCode: 'ERROR TO UPDATE',
        errorDescription: 'Error to update this carrier',
        statusCode: 400,
      });
    }
  }

  async deleteACarrier(id: number): Promise<{message: string}> {
    const carrier = await this.showACarrier(id);

    try {
      await this.repository.deleteACarrier(carrier.carrier_id);
      return {
        message: 'Carrier deleted',
      };
    } catch (e) {
      throw new CustomException({
        errorCode: 'ERROR TO DELETE',
        errorDescription: 'Error to delete this carrier',
        statusCode: 400,
      });
    }
  }
}
