import { Ring } from "../../domain/Rings";
import { IRingsRepository } from "../IRingsRepository";

export class RingsRepositoryInMemory implements IRingsRepository {
  rings: Ring[];

  constructor(rings: Ring[]) {
    this.rings = rings;
  }

  async delete(id: string): Promise<void> {
    this.rings.filter(ring => ring.id !== id)
  }
  
  async getAllRingsbyForjadoPor(forjadoPor: string): Promise<Ring[]> {
    return this.rings.filter(ring => ring.forjadoPor === forjadoPor)
  }

  async getRingbyName(name: string): Promise<Ring | null> {
    return this.rings.find(ring => ring.nome.toLocaleLowerCase().trim() === name.toLocaleLowerCase())!
  }

  async getRingbyId(id: string): Promise<Ring | null> {
    return this.rings.find(ring => ring.id === id)!
  }

  async getAllRings(): Promise<Ring[]> {
    return this.rings
  }

  async save(ring: Ring): Promise<void> {
    this.rings.push(ring)
  }
}
