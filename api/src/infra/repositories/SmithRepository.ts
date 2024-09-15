import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Smith } from '../entities/Smith'
import { SmithDTO } from '@/application/dto/SmithDTO'
import { SmithRepository } from '@/application/contracts/smithRepository'

export class SmithTypeORMRepository implements SmithRepository {
  private ormRepository: Repository<Smith>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Smith)
  }

  async findById(id: string): Promise<SmithDTO | null> {
    const smith = await this.ormRepository.findOneBy({ id })
    if (!smith) {
      return null
    }

    return {
      id: smith.id,
      name: smith.name,
      description: smith.description,
      itemLimit: smith.itemLimit,
    }
  }

  async findAll(): Promise<SmithDTO[]> {
    const smiths = await this.ormRepository.find()

    return smiths.map((smith) => ({
      id: smith.id,
      name: smith.name,
      description: smith.description,
      itemLimit: smith.itemLimit,
    }))
  }
}
