import { ReadAllSmithsUseCase } from '@/domain/useCases/readAllSmithsUseCase'
import { SmithRepository } from '../contracts/smithRepository'
import { SmithDTO } from '../dto/SmithDTO'

export class ReadAllSmithsService implements ReadAllSmithsUseCase {
  constructor(private readonly smithRepository: SmithRepository) {}

  async execute(): Promise<SmithDTO[]> {
    const smiths = this.smithRepository.findAll()
    return smiths
  }
}
