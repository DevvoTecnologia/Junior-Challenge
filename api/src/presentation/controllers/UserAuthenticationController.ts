import { UserDTO } from '@/application/dto/UserDTO'
import jwt from 'jsonwebtoken'
import { Controller } from '../contracts/controller'
import { UserAuthenticationUseCase } from '@/domain/useCases/userAuthenticationUseCase'
import { HttpRequest, HttpResponse, ok } from '../contracts/http'
import { BadRequestError } from '@/main/errors'

type AuthenticationResponse = {
  token: string
  user: UserDTO
}

export class UserAuthenticationController implements Controller {
  constructor(private readonly userAuthentication: UserAuthenticationUseCase) {}

  async handle(
    req: HttpRequest,
  ): Promise<HttpResponse<AuthenticationResponse>> {
    const { username, password } = req.body

    if (!username) {
      throw new BadRequestError('username is empty')
    }

    if (!password) {
      throw new BadRequestError('Password is empty')
    }

    const user = await this.userAuthentication.execute({
      username,
      password,
    })

    const token = jwt.sign({}, '395ad606-2bbc-4e77-86b4-1a31e91ab5b5', {
      subject: user.id,
      expiresIn: '2h',
    })

    const viewModel = {
      user: {
        id: user.id,
        username: user.username,
      },
    }

    return ok(viewModel, 200, [
      {
        name: 'token',
        value: token,
        options: {
          httpOnly: false,
          secure: true,
          sameSite: 'strict',
          maxAge: 2 * 60 * 60 * 1000,
        },
      },
    ])
  }
}
