import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Artifact } from '../entities/Artifact'
import { ArtifactDTO } from '@/application/dto/ArtifactDTO'

export class ArtifactTypeORMRepository {
  private ormRepository: Repository<Artifact>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Artifact)
  }

  async create(artifactDTO: ArtifactDTO): Promise<ArtifactDTO> {
    const artifact = this.ormRepository.create({
      name: artifactDTO.name,
      power: artifactDTO.power,
      imageUrl: artifactDTO.imageUrl,
      bearer: artifactDTO.bearer ? { id: artifactDTO.bearer } : undefined,
      forgedBy: artifactDTO.forgedBy ? { id: artifactDTO.forgedBy } : undefined,
    })

    await this.ormRepository.save(artifact)

    return {
      id: artifact.id,
      name: artifact.name,
      power: artifact.power,
      bearer: artifact.bearer?.id || undefined,
      forgedBy: artifact.forgedBy?.id || undefined,
      imageUrl: artifact.imageUrl,
    }
  }

  async findById(id: string): Promise<ArtifactDTO | null> {
    const artifact = await this.ormRepository.findOne({
      where: { id },
      relations: ['bearer', 'forgedBy'],
    })

    if (!artifact) {
      return null
    }

    return {
      id: artifact.id,
      name: artifact.name,
      power: artifact.power,
      imageUrl: artifact.imageUrl,
      bearer: artifact.bearer?.id || undefined,
      forgedBy: artifact.forgedBy?.id || undefined,
    }
  }

  async findAll(): Promise<ArtifactDTO[]> {
    const artifacts = await this.ormRepository.find({
      relations: ['bearer', 'forgedBy'],
    })

    return artifacts.map((artifact) => ({
      id: artifact.id,
      name: artifact.name,
      power: artifact.power,
      imageUrl: artifact.imageUrl,
      bearer: artifact.bearer?.id || undefined,
      forgedBy: artifact.forgedBy?.id || undefined,
    }))
  }
}
