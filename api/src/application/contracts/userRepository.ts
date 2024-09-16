import { UserDTO } from '../dto/UserDTO'

export interface UserRepository {
  create: (userData: UserDTO) => Promise<UserDTO>
  findById: (id: string) => Promise<UserDTO>
  findByUsername: (email: string) => Promise<UserDTO>
  findAll: () => Promise<UserDTO[]>
}
