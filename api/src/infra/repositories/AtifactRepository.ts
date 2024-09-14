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

  async create(artifact: ArtifactDTO): Promise<ArtifactDTO> {
    const createdArtifact = this.ormRepository.create(artifact)
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

  async update(artifact: Required<ArtifactDTO>): Promise<void> {
    await this.ormRepository.update(artifact.id, artifact)
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}
