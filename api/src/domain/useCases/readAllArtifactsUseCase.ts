import { ArtifactDTO } from '@/application/dto/ArtifactDTO'

export interface ReadAllArtifactsUseCase {
  execute: () => Promise<ArtifactDTO[]>
}
