import { Anel } from '../models/ring.model';

export interface AnelRepository {
  create(data: any): Promise<Anel>;
  findAll(): Promise<Anel[]>;
  findById(id: number): Promise<Anel | null>;
  countAnelByForjador(forjadoPor: string): Promise<number>;
}

export class SequelizeAnelRepository implements AnelRepository {
  async create(data: any): Promise<Anel> {
    return await Anel.create(data);
  }

  async findAll(): Promise<Anel[]> {
    return await Anel.findAll();
  }

  async findById(id: number): Promise<Anel | null> {
    return await Anel.findByPk(id);
  }

  async countAnelByForjador(forjadoPor: string): Promise<number> {
    return await Anel.count({ where: { forjadoPor } });
  }
}
