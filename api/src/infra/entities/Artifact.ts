import { Entity, PrimaryColumn, Column, BeforeInsert, ManyToOne } from 'typeorm'
import { nanoid } from 'nanoid'
import { Character } from './Character'
import { Smith } from './Smith'

@Entity('artifacts')
export class Artifact {
  @PrimaryColumn({ type: 'varchar', length: 21 })
  id!: string

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'varchar', length: 255 })
  power!: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl!: string

  @Column({ type: 'varchar', length: 21, nullable: true })
  bearerId?: string

  @ManyToOne(() => Character, (character) => character.artifacts, {
    nullable: true,
  })
  bearer?: Character

  @Column({ type: 'varchar', length: 21, nullable: true })
  forgedById?: string

  @ManyToOne(() => Smith, (smith) => smith.artifacts, { nullable: true })
  forgedBy?: Smith

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = nanoid()
    }
  }
}
