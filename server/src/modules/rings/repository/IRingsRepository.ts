import { Ring } from "../domain/Rings"

export interface IRingsRepository {
  getRingbyId(id: string): Promise<Ring | null>
  getRingbyName(name: string): Promise<Ring | null>
  getAllRingsbyForjadoPor(forjadoPor: string): Promise<Ring[]>
  getAllRings(): Promise<Ring[]>
  save(ring: Ring): Promise<void>
  delete(id: string): Promise<void>
}