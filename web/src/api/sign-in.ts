import { api } from '@/lib/axios'

export type SignInRequest = {
  username: string
  password: string
}

export type SignInResponse = {
  user: {
    id: string
    username: string
  }
}

export async function SignIn({ username, password }: SignInRequest) {
  const { data } = await api.post<SignInResponse>(`/login`, {
    username,
    password,
  })

  return data
}
