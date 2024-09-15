import { Injectable } from '@nestjs/common';
import { CarriersService } from '../modules/carriers/carriers.service';
import { ForgersService } from '../modules/forgers/forgers.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly forgersService: ForgersService,
    private readonly carrierService: CarriersService,
  ) {}

  async seed() {
    await this.createCarriers();
    await this.createForgers();
    console.log('Seed completed!');
  }

  private async createCarriers() {
    const carriers = [{ name: 'Gandalf' }, { name: 'Bilbo' }];

    for (const carrier of carriers) {
      const carrierFound = await this.carrierService.getCarrierByName(
        carrier.name,
      );

      if (carrierFound) {
        continue;
      }

      await this.carrierService.createACarrier(carrier.name);
    }
  }

  private async createForgers() {
    const forgers = [
      {
        name: 'Elfos',
        max_forge: 3,
      },
      {
        name: 'Anões',
        max_forge: 7,
      },
      {
        name: 'Homens',
        max_forge: 9,
      },
      {
        name: 'Sauron',
        max_forge: 1,
      },
    ];

    for (const forger of forgers) {
      const forgerFound = await this.forgersService.getForgerByName(
        forger.name,
      );

      if (forgerFound) {
        continue;
      }

      await this.forgersService.createAForger({
        name: forger.name,
        max_forge: forger.max_forge,
      });
    }
  }
}
