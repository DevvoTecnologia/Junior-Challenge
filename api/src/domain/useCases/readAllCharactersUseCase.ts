import { CharacterDTO } from '@/application/dto/CharacterDTO'

export interface ReadAllCharactersUseCase {
  execute: () => Promise<CharacterDTO[]>
}
