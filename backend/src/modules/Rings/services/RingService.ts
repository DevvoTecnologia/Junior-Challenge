import { Repository } from "typeorm";
import dataSource from "../../../database/connection";
import { Ring } from "../entities/Rings";
import { IRingService } from "../repositories/IRingRepository";

interface RingData {
  name: string;
  power: string;
  carrier: string;
  forgedBy: string;
  image_url: string;
}

export class RingService implements IRingService {
  private ringRepository: Repository<Ring>;

  constructor() {
    this.ringRepository = dataSource.getRepository(Ring);
  }

  public async createRing(data: RingData): Promise<Ring> {
    const { name, power, carrier, forgedBy, image_url } = data;

    if (!name || !power || !carrier || !forgedBy || !image_url) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const ringCount = await this.ringRepository.count({ where: { forgedBy } });
    const maxLimit = this.getMaxLimit(forgedBy);

    if (ringCount >= maxLimit) {
      throw new Error(
        `O limite de anéis para o forjador ${forgedBy} foi atingido. Por favor, escolha um forjador diferente.`
      );
    }

    const ring = this.ringRepository.create({
      name,
      carrier,
      forgedBy,
      image_url,
      power,
    });
    return await this.ringRepository.save(ring);
  }

  public getAllRings(): Promise<Ring[]> {
    return this.ringRepository.find();
  }

  public async updateRing(id: number, data: RingData): Promise<Ring> {
    const ring = await this.ringRepository.findOneBy({ id });

    if (!ring) {
      throw new Error("Anel não encontrado");
    }

    const oldForgedBy = ring.forgedBy;
    const { forgedBy } = data;

    Object.assign(ring, data);

    if (forgedBy && forgedBy !== oldForgedBy) {
      const maxLimitByNewForger = this.getMaxLimit(forgedBy);
      const ringCountForNewForger = await this.ringRepository.count({
        where: { forgedBy },
      });

      if (ringCountForNewForger >= maxLimitByNewForger) {
        throw new Error(
          `O limite de anéis para o forjador ${forgedBy} foi atingido. Por favor, escolha um forjador diferente.`
        );
      }
    }

    return await this.ringRepository.save(ring);
  }

  public async deleteRing(id: number): Promise<void> {
    const ring = await this.ringRepository.findOneBy({ id });

    if (!ring) {
      throw new Error("Anel não encontrado");
    }

    await this.ringRepository.remove(ring);
  }

  private getMaxLimit(forgedBy: string): number {
    switch (forgedBy) {
      case "Elfos":
        return 3;
      case "Anões":
        return 7;
      case "Homens":
        return 9;
      case "Sauron":
        return 1;
      default:
        throw new Error("Forjador inválido");
    }
  }
}
