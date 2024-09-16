export class User {
  id?: string
  username: string
  password: string

  constructor(username: string, password: string, id?: string) {
    this.username = username
    this.password = password
    this.id = id
  }
}
