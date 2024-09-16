import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm'
import { nanoid } from 'nanoid'

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 21 })
  id!: string

  @Column({ type: 'varchar', length: 255, unique: true })
  username!: string

  @Column({ type: 'varchar', length: 255 })
  password!: string

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = nanoid()
    }
  }
}
