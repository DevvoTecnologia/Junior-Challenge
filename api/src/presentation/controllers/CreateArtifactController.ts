import { CreateArtifactUseCase } from '@/domain/useCases/createArtifactUseCase'
import { Controller } from '@/presentation/contracts/controller'
import { HttpRequest, HttpResponse, ok } from '@/presentation/contracts/http'

export class CreateArtifactController implements Controller {
  constructor(private readonly createArtifact: CreateArtifactUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const artifact = await this.createArtifact.execute({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      power: req.body.power,
      bearer: req.body.bearer,
      forgedBy: req.body.forgedBy,
    })

    return ok(artifact)
  }
}
