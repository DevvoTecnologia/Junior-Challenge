import { Repository } from "typeorm";
import { dataSource } from "../../../shared/infra/typeorm"
import { Ring } from "../domain/Rings";
import { IRingsRepository } from "./IRingsRepository";

export class RingsRepository implements IRingsRepository {
  private repository: Repository<Ring>;

  constructor() {
    this.repository = dataSource.getRepository(Ring);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
  
  async getAllRingsbyForjadoPor(forjadoPor: string): Promise<Ring[]> {
    return this.repository.findBy({forjadoPor})
  }

  async getRingbyName(name: string): Promise<Ring | null> {
    return this.repository.findOne({ where: { nome: name } })
  }

  async getRingbyId(id: string): Promise<Ring | null> {
    return await this.repository.findOne({where: { id }})
  }

  async getAllRings(): Promise<Ring[]> {
    return this.repository.find()
  }

  async save(ring: Ring): Promise<void> {
    this.repository.save(ring)
  }
}
