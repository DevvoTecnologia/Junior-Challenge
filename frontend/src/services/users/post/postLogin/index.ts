import api from '../../../api'
import { IPropsLogin, IPropsResponseLogin } from './types'

export default async function postLogin({
  password,
  email
}: IPropsLogin): Promise<IPropsResponseLogin> {
  const response = await api().post('/login', {
    password,
    email
  })

  return response.data
}
