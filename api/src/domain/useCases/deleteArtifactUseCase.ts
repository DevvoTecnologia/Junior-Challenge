export interface DeleteArtifactUseCase {
  execute: (id: string) => Promise<void>
}
