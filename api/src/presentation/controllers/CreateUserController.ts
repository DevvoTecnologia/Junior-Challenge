import { CreateUserUseCase } from '@/domain/useCases/createUserUseCase'
import { Controller } from '@/presentation/contracts/controller'
import { HttpRequest, HttpResponse, ok } from '@/presentation/contracts/http'

export class CreateUserController implements Controller {
  constructor(private readonly createUser: CreateUserUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    await this.createUser.execute({
      username: req.body.username,
      password: req.body.password,
    })

    return ok()
  }
}
