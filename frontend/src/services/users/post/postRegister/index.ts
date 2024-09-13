import api from '../../../api'
import { IPropsRegister, IPropsResponseRegister } from './types'

export default async function postRegister({
  password,
  email
}: IPropsRegister): Promise<IPropsResponseRegister> {
  const response = await api().post('/register', {
    password,
    email
  })

  return response.data
}
