import { DeleteArtifactUseCase } from '@/domain/useCases/deleteArtifactUseCase'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse, ok } from '../contracts/http'

export class DeleteArtifactController implements Controller {
  constructor(private readonly DeleteArtifact: DeleteArtifactUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    await this.DeleteArtifact.execute(req.params.id)
    return ok()
  }
}
