import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Artifact } from '../entities/Artifact'
import { ArtifactDTO } from '@/application/dto/ArtifactDTO'
import { Character } from '../entities/Character'
import { Smith } from '../entities/Smith'
import { NotFoundError } from '@/application/errors/NotFoundError'

export class ArtifactTypeORMRepository {
  private ormRepository: Repository<Artifact>
  private characterRepository: Repository<Character>
  private smithRepository: Repository<Smith>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Artifact)
    this.characterRepository = AppDataSource.getRepository(Character)
    this.smithRepository = AppDataSource.getRepository(Smith)
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

  async update(artifactDTO: ArtifactDTO): Promise<void> {
    const artifact = await this.ormRepository.findOne({
      where: { id: artifactDTO.id },
      relations: ['bearer', 'forgedBy'],
    })

    if (!artifact) {
      throw new Error(`Artefato com id ${artifactDTO.id} não encontrado`)
    }

    if (artifactDTO.bearer) {
      const bearer = await this.characterRepository.findOne({
        where: { id: artifactDTO.bearer },
      })
      artifact.bearer = bearer || undefined
    } else {
      artifact.bearer = undefined
    }

    if (artifactDTO.forgedBy) {
      const smith = await this.smithRepository.findOne({
        where: { id: artifactDTO.forgedBy },
      })
      artifact.forgedBy = smith || undefined
    } else {
      artifact.forgedBy = undefined
    }

    artifact.name = artifactDTO.name
    artifact.power = artifactDTO.power
    artifact.imageUrl = artifactDTO.imageUrl

    await this.ormRepository.save(artifact)
  }

  async delete(id: string): Promise<void> {
    const artifact = await this.ormRepository.findOne({
      where: { id },
    })

    if (!artifact) {
      throw new NotFoundError('Artefato', id)
    }

    await this.ormRepository.remove(artifact)
  }
}
