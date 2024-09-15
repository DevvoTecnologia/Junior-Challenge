// src/infra/repositories/CharacterTypeORMRepository.ts
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Character as CharacterEntity } from '../entities/Character'
import { CharacterDTO } from '@/application/dto/CharacterDTO'

export class CharacterTypeORMRepository {
  private ormRepository: Repository<CharacterEntity>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(CharacterEntity)
  }

  async findById(id: string): Promise<CharacterDTO | null> {
    const character = await this.ormRepository.findOneBy({ id })
    if (!character) {
      return null
    }

    return {
      id: character.id,
      name: character.name,
      description: character.description,
      imageUrl: character.imageUrl,
    }
  }

  async findAll(): Promise<CharacterDTO[]> {
    const characters = await this.ormRepository.find()
    return characters.map((character) => ({
      id: character.id,
      name: character.name,
      description: character.description,
      imageUrl: character.imageUrl,
    }))
  }
}
