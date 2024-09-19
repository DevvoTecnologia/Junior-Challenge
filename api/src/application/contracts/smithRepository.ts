import { SmithDTO } from '../dto/SmithDTO'

export interface SmithRepository {
  findById(id: string): Promise<SmithDTO | null>
  findAll(): Promise<SmithDTO[]>
}
