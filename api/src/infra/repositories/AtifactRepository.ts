import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Artifact } from '../entities/Artifact'
import { ArtifactRepository } from '@/application/contracts/artifactRepository'
import { ArtifactDTO } from '@/application/dto/ArtifactDTO'

export class ArtifactTypeORMRepository implements ArtifactRepository {
  private ormRepository: Repository<Artifact>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Artifact)
  }

  async create(artifactDTO: ArtifactDTO): Promise<ArtifactDTO> {
    const createdArtifact = this.ormRepository.create(artifactDTO)
    await this.ormRepository.save(createdArtifact)
    return createdArtifact
  }

  async findById(id: string): Promise<ArtifactDTO | null> {
    const artifact = await this.ormRepository.findOneBy({ id })
    return artifact || null
  }

  async findAll(): Promise<ArtifactDTO[]> {
    return this.ormRepository.find()
  }

  async update(artifactDTO: ArtifactDTO): Promise<void> {
    if (!artifactDTO.id) {
      throw new Error('Artifact ID é obrigatório.')
    }

    const updateData: Partial<Artifact> = {
      name: artifactDTO.name,
      power: artifactDTO.power,
      bearer: artifactDTO.bearer,
      forgedById: artifactDTO.forgedById,
      imageUrl: artifactDTO.imageUrl,
    }

    await this.ormRepository.update(artifactDTO.id, updateData)
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}
