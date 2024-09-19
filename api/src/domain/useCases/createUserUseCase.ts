export type CreateUserInput = {
  username: string
  password: string
}

export interface CreateUserUseCase {
  execute: (input: CreateUserInput) => Promise<void>
}
