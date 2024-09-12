import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from './Owner';

@Entity()
export class Ring {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  power: string;

  @Column({
    type: 'enum',
    enum: ['Elfos', 'Anões', 'Humanos', 'Sauron'],
  })
  forgedBy: 'Elfos' | 'Anões' | 'Humanos' | 'Sauron';

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @ManyToOne(() => Owner, (owner) => owner.rings)
  currentOwner: Owner;
}
