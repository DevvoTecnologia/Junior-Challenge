import { SmithDTO } from '@/application/dto/SmithDTO'

export interface ReadAllSmithsUseCase {
  execute: () => Promise<SmithDTO[]>
}
