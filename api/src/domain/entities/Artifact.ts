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
    this.name = name
    this.power = power
    this.imageUrl = imageUrl
    this.bearer = bearer
    this.forgedBy = forgedBy
    this.id = id
  }

  changeBearer(newBearer?: string): void {
    this.bearer = newBearer
  }
}
