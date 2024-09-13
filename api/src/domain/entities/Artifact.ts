import { nanoid } from 'nanoid'

export class Artifact {
  id?: string
  name: string
  power: string
  bearer?: string
  forgedBy?: string
  imageUrl: string

  constructor(
    name: string,
    power: string,
    imageUrl: string,
    bearer?: string,
    forgedBy?: string,
    id?: string,
  ) {
    this.id = id || nanoid()
    this.name = name
    this.power = power
    this.bearer = bearer
    this.forgedBy = forgedBy
    this.imageUrl = imageUrl
  }

  changeBearer(newBearer?: string): void {
    this.bearer = newBearer
  }
}
