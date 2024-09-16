import {
  CreateUserInput,
  CreateUserUseCase,
} from '@/domain/useCases/createUserUseCase'
import { UserRepository } from '../contracts/userRepository'
import { User } from '@/domain/entities/User'

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<void> {
    const user = new User(input.username, input.password)
    await this.userRepository.create(user)
  }
}
