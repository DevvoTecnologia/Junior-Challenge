import { ReadAllCharactersUseCase } from '@/domain/useCases/readAllCharactersUseCase'
import { CharacterRepository } from '../contracts/characterRepository'
import { CharacterDTO } from '../dto/CharacterDTO'

export class ReadAllCharactersService implements ReadAllCharactersUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(): Promise<CharacterDTO[]> {
    const characters = this.characterRepository.findAll()
    return characters
  }
}
