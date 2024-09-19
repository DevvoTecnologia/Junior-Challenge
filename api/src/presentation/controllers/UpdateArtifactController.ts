import { UpdateArtifactUseCase } from '@/domain/useCases/updateArtifactUseCase'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse, ok } from '../contracts/http'

export class UpdateArtifactController implements Controller {
  constructor(private readonly updateArtifact: UpdateArtifactUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    await this.updateArtifact.execute({
      id: req.params.id,
      name: req.body.name,
      power: req.body.power,
      bearer: req.body.bearer,
      forgedBy: req.body.forgedBy,
      imageUrl: req.body.imageUrl,
    })
    return ok()
  }
}
