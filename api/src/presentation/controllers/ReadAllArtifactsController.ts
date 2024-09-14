import { ReadAllArtifactsUseCase } from '@/domain/useCases/readAllArtifactsUseCase'
import { Controller } from '../contracts/controller'
import { HttpResponse, ok } from '../contracts/http'

export class ReadAllArtifactsController implements Controller {
  constructor(private readonly readAllArtifacts: ReadAllArtifactsUseCase) {}

  async handle(): Promise<HttpResponse> {
    const artifacts = await this.readAllArtifacts.execute()
    return ok(artifacts)
  }
}
