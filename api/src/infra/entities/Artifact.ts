import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm'
import { nanoid } from 'nanoid'

@Entity('artifacts')
export class Artifact {
  @PrimaryColumn({ type: 'varchar', length: 21 }) // Tamanho do ID para nanoid
  id!: string

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'varchar', length: 255 })
  power!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  bearer?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  forgedBy?: string

  @Column({ type: 'varchar', length: 255 })
  imageUrl!: string

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = nanoid()
    }
  }
}
