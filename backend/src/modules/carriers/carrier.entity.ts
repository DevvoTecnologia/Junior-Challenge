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
@Unique(['carrier_id'])
export class Carrier {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  carrier_id: number;

  @Column()
  carrier_name: string;

  @OneToMany(() => Ring, (ring) => ring.carrier)
  rings: Ring[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
