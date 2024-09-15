import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Carrier } from '../carriers/carrier.entity';
import { Forger } from '../forgers/forger.entity';

@Entity()
@Unique(['ring_id'])
export class Ring {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  ring_id: number;

  @Column()
  ring_name: string;

  @Column()
  ring_image: string;

  @Column()
  ring_power: string;

  @ManyToOne(() => Forger, (forger) => forger.rings)
  forger: Forger;

  @ManyToOne(() => Carrier, (carrier) => carrier.rings)
  carrier: Carrier;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
