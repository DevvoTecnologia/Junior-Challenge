import { UserDTO } from '@/application/dto/UserDTO'

export type loginInput = {
  username: string
  password: string
}

export interface UserAuthenticationUseCase {
  execute(input: loginInput): Promise<UserDTO>
}
