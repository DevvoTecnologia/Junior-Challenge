import { AppDataSource } from '../data-source';
import { Ring } from '../models/Ring';

class RingService {
  static async create(data: Partial<Ring>): Promise<Ring> {
    const ringRepository = AppDataSource.getRepository(Ring);

    const { forgedBy } = data;

    if (!forgedBy) {
      throw new Error('O campo "forgedBy" é obrigatório.');
    }

    const count = await ringRepository.count({ where: { forgedBy } });

    let maxRings = 0;

    switch (forgedBy.toLowerCase()) {
      case 'elfos':
        maxRings = 3;
        break;
      case 'anões':
        maxRings = 7;
        break;
      case 'homens':
        maxRings = 9;
        break;
      case 'sauron':
        maxRings = 1;
        break;
      default:
        throw new Error('Forjador desconhecido.');
    }

    if (count >= maxRings) {
      throw new Error(`O número máximo de anéis forjados por ${forgedBy} é ${maxRings}.`);
    }

    const ring = ringRepository.create(data);
    await ringRepository.save(ring);
    return ring;
  }

  static async getAll(): Promise<Ring[]> {
    const ringRepository = AppDataSource.getRepository(Ring);
    return ringRepository.find();
  }

  static async update(id: number, data: Partial<Ring>): Promise<Ring> {
    const ringRepository = AppDataSource.getRepository(Ring);
    const ring = await ringRepository.findOneBy({ id });

    if (!ring) {
      throw new Error('Anel não encontrado.');
    }

    ringRepository.merge(ring, data);
    await ringRepository.save(ring);
    return ring;
  }

  static async delete(id: number): Promise<void> {
    const ringRepository = AppDataSource.getRepository(Ring);
    const result = await ringRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Anel não encontrado.');
    }
  }

  static async getById(id: number): Promise<Ring | null> {
    const ringRepository = AppDataSource.getRepository(Ring);
    const ring = await ringRepository.findOneBy({ id });
    if (!ring) {
      throw new Error('Anel não encontrado.');
    }
    return ring;
  }
}

export default RingService;
