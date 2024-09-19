import { Entity, PrimaryColumn, Column, OneToMany, BeforeInsert } from 'typeorm'
import { nanoid } from 'nanoid'
import { Artifact } from './Artifact'

@Entity('characters')
export class Character {
  @PrimaryColumn({ type: 'varchar', length: 21 })
  id!: string

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'varchar', length: 255 })
  description!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl!: string

  @OneToMany(() => Artifact, (artifact) => artifact.bearer)
  artifacts!: Artifact[]

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = nanoid()
    }
  }
}
