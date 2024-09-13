// src/entities/Ring.ts
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export enum ForgedBy {
  ELVES = 'Elfos',
  DWARVES = 'Anões',
  MEN = 'Homens',
  SAURON = 'Sauron',
}

@Entity('rings')
export class Ring {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  power: string;

  @Column()
  owner: string;

  @Column({
    type: 'enum',
    enum: ForgedBy,
  })
  forgedBy: ForgedBy;

  @Column()
  image: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
