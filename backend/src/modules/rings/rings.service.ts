import { Injectable } from '@nestjs/common';
import { CarriersService } from '../carriers/carriers.service';
import { ForgersService } from '../forgers/forgers.service';
import { CustomException } from './../../utils/CustomException';
import { createRingDTO } from './ring.dto';
import { Ring } from './ring.entity';
import { RingsRepository } from './rings.repository';
import { CheckMaxForge, Dependencies, DependenciesReturn } from './types';

@Injectable()
export class RingsService {
  constructor(
    private readonly repository: RingsRepository,
    private readonly carrierService: CarriersService,
    private readonly forgerService: ForgersService,
  ) {}

  async getDependencies({
    carrier_id,
    forger_id,
  }: Dependencies): Promise<DependenciesReturn> {
    const carrier = await this.carrierService.getCarrierById(carrier_id);
    const forger = await this.forgerService.getForgerById(forger_id);
    return { carrier, forger };
  }

  async checkMaxForge({ forger, condition }: CheckMaxForge): Promise<void> {
    const rings = await this.repository.listRingsByForge(forger);

    if (condition && rings.length >= forger.forger_max_forge) {
      throw new CustomException({
        errorCode: 'MAX FORGE',
        errorDescription: 'This forger has already achieved his limit',
        statusCode: 409,
      });
    }
  }

  async createARing(data: createRingDTO): Promise<Ring> {
    const { forger_id, carrier_id, ring_image, ring_name, ring_power } = data;
    const { carrier, forger } = await this.getDependencies({
      forger_id,
      carrier_id,
    });

    await this.checkMaxForge({ forger, condition: true });

    const dbRing = new Ring();
    dbRing.ring_image = ring_image;
    dbRing.ring_name = ring_name;
    dbRing.ring_power = ring_power;
    dbRing.carrier = carrier;
    dbRing.forger = forger;

    return await this.repository.createARing(dbRing);
  }

  async updateARing(
    id: number,
    data: createRingDTO,
  ): Promise<{ message: string }> {
    const { forger_id, carrier_id, ring_image, ring_name, ring_power } = data;

    const ring = await this.showARing(id);
    const { carrier, forger } = await this.getDependencies({
      forger_id,
      carrier_id,
    });

    console.log(forger, ring.forger);
    await this.checkMaxForge({
      forger,
      condition: forger.forger_id !== ring.forger.forger_id,
    });

    ring.ring_image = ring_image;
    ring.ring_name = ring_name;
    ring.ring_power = ring_power;
    ring.carrier = carrier;
    ring.forger = forger;
    ring.updated_at = new Date();

    try {
      await this.repository.updateARing({ id, data: ring });
      return {
        message: 'Ring updated',
      };
    } catch (e) {
      throw new CustomException({
        errorCode: 'ERROR TO UPDATE',
        errorDescription: 'Error to update this ring',
        statusCode: 400,
      });
    }
  }

  async listRings(): Promise<Ring[]> {
    return await this.repository.listRings();
  }

  async showARing(id: number): Promise<Ring> {
    const ring = await this.repository.showARing(id);

    if (!ring) {
      throw new CustomException({
        errorCode: 'RING NOT FOUND',
        errorDescription: 'Ring not found',
        statusCode: 404,
      });
    }
    return ring;
  }

  async deleteARing(id: number): Promise<{ message: string }> {
    const ring = await this.showARing(id);

    try {
      await this.repository.deleteARing(ring.ring_id);
      return {
        message: 'Ring deleted',
      };
    } catch (e) {
      throw new CustomException({
        errorCode: 'ERROR TO DELETE',
        errorDescription: 'Error to delete this ring',
        statusCode: 400,
      });
    }
  }
}
