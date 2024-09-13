import api from '../../../api'
import { IPropsEditRing, IPropsResponseEditRing } from './types'

export default async function putRing({
  forgedBy,
  imagem,
  name,
  owner,
  power,
  id
}: IPropsEditRing): Promise<IPropsResponseEditRing> {
  const body: IPropsEditRing = {
    id
  }

  if (forgedBy) body.forgedBy = forgedBy
  if (imagem) body.imagem = imagem
  if (name) body.name = name
  if (owner) body.owner = owner
  if (power) body.power = power

  const response = await api().put('/ring', {
    ...body
  })

  return response.data
}
