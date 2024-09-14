import { Entity, Column, OneToMany, PrimaryColumn, BeforeInsert } from 'typeorm'
import { Artifact } from './Artifact'
import { nanoid } from 'nanoid'

@Entity('smiths')
export class Smith {
  @PrimaryColumn({ type: 'varchar', length: 21 })
  id!: string

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string

  @Column({ type: 'int' })
  itemLimit!: number

  @OneToMany(() => Artifact, (artifact) => artifact.forgedById)
  artifacts!: Artifact[]

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = nanoid()
    }
  }
}
