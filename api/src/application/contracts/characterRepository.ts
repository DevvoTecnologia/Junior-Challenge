import { CharacterDTO } from '@/application/dto/CharacterDTO'

export interface CharacterRepository {
  findById(id: string): Promise<CharacterDTO | null>
  findAll(): Promise<CharacterDTO[]>
}
