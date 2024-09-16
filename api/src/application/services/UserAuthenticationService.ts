import {
  loginInput,
  UserAuthenticationUseCase,
} from '@/domain/useCases/userAuthenticationUseCase'
import { UserRepository } from '../contracts/userRepository'
import { CrypterRepository } from '../contracts/crypterRepository'
import { UserDTO } from '../dto/UserDTO'
import { NotFoundError } from '../errors/NotFoundError'
import { BadRequestError } from '@/main/errors'

export class UserAuthenticationService implements UserAuthenticationUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypterrepository: CrypterRepository,
  ) {}

  async execute(input: loginInput): Promise<UserDTO> {
    const user = await this.userRepository.findByUsername(input.username)

    if (!user) {
      throw new NotFoundError('User')
    }

    const passwordMatch = await this.crypterrepository.compare(
      input.password,
      user.password,
    )

    if (!passwordMatch) {
      throw new BadRequestError('Username ou senha incorretos')
    }

    return user
  }
}
