import api from '../../../api'
import { IPropsCreateRing, IPropsResponseCreateRing } from './types'

export default async function postCreateRing({
  forgedBy,
  imagem,
  name,
  owner,
  power
}: IPropsCreateRing): Promise<IPropsResponseCreateRing> {
  const response = await api().post('/ring', {
    forgedBy,
    imagem,
    name,
    owner,
    power
  })

  return response.data
}
