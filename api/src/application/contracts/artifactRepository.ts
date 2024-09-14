import { ArtifactDTO } from '../dto/ArtifactDTO'

export interface ArtifactRepository {
  create(artifact: ArtifactDTO): Promise<ArtifactDTO>
  findById(id: string): Promise<ArtifactDTO | null>
  findAll(): Promise<ArtifactDTO[]>
  update(artifact: ArtifactDTO): Promise<void>
  delete(id: string): Promise<void>
}
