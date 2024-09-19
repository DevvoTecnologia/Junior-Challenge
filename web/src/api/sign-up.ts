import { api } from '@/lib/axios'

export type SignUpRequest = {
  username: string
  password: string
}

export async function SignUp({ username, password }: SignUpRequest) {
  await api.post(`/users`, {
    username,
    password,
  })
}
