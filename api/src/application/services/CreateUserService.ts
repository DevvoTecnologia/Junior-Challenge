import {
  CreateUserInput,
  CreateUserUseCase,
} from '@/domain/useCases/createUserUseCase'
import { UserRepository } from '../contracts/userRepository'
import { User } from '@/domain/entities/User'
import { CrypterRepository } from '../contracts/crypterRepository'

export class CreateUserService implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypterrepository: CrypterRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    const cryptPassword = await this.crypterrepository.crypt(input.password)
    const user = new User(input.username, cryptPassword)
    await this.userRepository.create(user)
  }
}
