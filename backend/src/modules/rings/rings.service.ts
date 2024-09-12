import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from 'src/utils/CustomException';
import { Repository } from 'typeorm';
import { CarriersService } from '../carriers/carriers.service';
import { Forger } from '../forgers/forger.entity';
import { ForgersService } from '../forgers/forgers.service';
import { createRingDTO } from './ring.dto';
import { Ring } from './ring.entity';

@Injectable()
export class RingService {
  constructor(
    @InjectRepository(Ring)
    private readonly ringRepository: Repository<Ring>,
    private readonly carrierService: CarriersService,
    private readonly forgerService: ForgersService,
  ) {}

  async createARing(data: createRingDTO): Promise<Ring> {
    const { forger_id, carrier_id, ring_image, ring_name, ring_power } = data;
    const carrier = await this.carrierService.getCarrierById(carrier_id);
    const forger = await this.forgerService.getForgerById(forger_id);
    const rings = await this.listRingsByForge(forger);

    if (rings.length >= forger.forger_max_forge) {
      throw new CustomException({
        errorCode: 'MAX FORGE',
        errorDescription: 'This forger has already achieved his limit',
        statusCode: 400,
      });
    }

    const dbRing = new Ring();
    dbRing.ring_image = ring_image;
    dbRing.ring_name = ring_name;
    dbRing.ring_power = ring_power;
    dbRing.carrier = carrier;
    dbRing.forger = forger;

    return await this.ringRepository.save(dbRing);
  }

  async updateARing(id: number, data: createRingDTO) {
    const { forger_id, carrier_id, ring_image, ring_name, ring_power } = data;

    const ring = await this.showARing(id);
    const carrier = await this.carrierService.getCarrierById(carrier_id);
    const forger = await this.forgerService.getForgerById(forger_id);
    const rings = await this.listRingsByForge(forger);

    if (forger !== ring.forger && rings.length >= forger.forger_max_forge) {
      throw new CustomException({
        errorCode: 'MAX FORGE',
        errorDescription: 'This forger has already achieved his limit',
        statusCode: 400,
      });
    }

    ring.ring_image = ring_image;
    ring.ring_name = ring_name;
    ring.ring_power = ring_power;
    ring.carrier = carrier;
    ring.forger = forger;
    ring.updated_at = new Date();

    try {
      await this.ringRepository.update(id, ring);
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

  async listRingsByForge(forger: Forger): Promise<Ring[]> {
    const rings = await this.ringRepository.find({
      where: {
        forger: {
          forger_id: forger.forger_id,
        },
      },
    });
    return rings;
  }

  async listRings(): Promise<Ring[]> {
    return await this.ringRepository.find({
      relations: {
        carrier: true,
        forger: true,
      },
      where: {
        deleted_at: null,
      },
    });
  }

  async showARing(id: number): Promise<Ring> {
    const ring = await this.ringRepository.findOne({
      where: {
        ring_id: id,
        deleted_at: null,
      },
      relations: {
        forger: true,
        carrier: true,
      },
    });
    if (!ring) {
      throw new CustomException({
        errorCode: 'RING NOT FOUND',
        errorDescription: 'Ring not found',
        statusCode: 400,
      });
    }
    return ring;
  }

  async getARing(id: number) {
    return await this.ringRepository.findOne({
      where: {
        ring_id: id,
        deleted_at: null,
      },
    });
  }

  async deleteARing(id: number) {
    const ring = await this.showARing(id);

    try {
      await this.ringRepository.softDelete(ring.ring_id);
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
