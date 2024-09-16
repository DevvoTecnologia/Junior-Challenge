import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { UserDTO } from '@/application/dto/UserDTO'
import { NotFoundError } from '@/application/errors/NotFoundError'
import { UserRepository } from '@/application/contracts/userRepository'

export class UserTypeORMRepository implements UserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User)
  }

  async create(userDTO: UserDTO): Promise<void> {
    const user = this.ormRepository.create({
      id: userDTO.id,
      username: userDTO.username,
      password: userDTO.password,
    })

    await this.ormRepository.save(user)
  }

  async findById(id: string): Promise<UserDTO> {
    const user = await this.ormRepository.findOne({
      where: { id },
    })

    if (!user) {
      throw new NotFoundError('User', id)
    }

    return {
      id: user.id,
      username: user.username,
      password: user.password,
    }
  }

  async findByUsername(username: string): Promise<UserDTO> {
    const user = await this.ormRepository.findOne({
      where: { username },
    })

    if (!user) {
      throw new NotFoundError('User', username)
    }

    return {
      id: user.id,
      username: user.username,
      password: user.password,
    }
  }

  async findAll(): Promise<UserDTO[]> {
    const users = await this.ormRepository.find()

    return users.map((user) => ({
      id: user.id,
      username: user.username,
      password: user.password,
    }))
  }
}
