export class Smith {
  id: string
  name: string
  description: string
  itemLimit: number

  constructor(
    id: string,
    name: string,
    description: string,
    itemLimit: number,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.itemLimit = itemLimit
  }
}
