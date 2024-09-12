import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Ring } from '../rings/ring.entity';

@Entity()
@Unique(['forger_id'])
export class Forger {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  forger_id: number;

  @Column()
  forger_name: string;

  @Column()
  forger_max_forge: number;

  @OneToMany(() => Ring, (ring) => ring.forger)
  rings: Ring[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
