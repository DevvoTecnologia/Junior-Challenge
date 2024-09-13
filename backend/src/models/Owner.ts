import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Ring } from './Ring';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Ring, (ring) => ring.currentOwner)
  rings: Relation<Ring[]>;
}
