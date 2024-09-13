import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Owner } from './Owner';

@Entity()
export class Ring {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  power: string;

  @Column({
    type: 'enum',
    enum: ['Elfos', 'Anões', 'Humanos', 'Sauron'],
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['Elfos', 'Anões', 'Humanos', 'Sauron'])
  forgedBy: 'Elfos' | 'Anões' | 'Humanos' | 'Sauron';

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  image: string;

  @ManyToOne(() => Owner, (owner) => owner.rings)
  currentOwner: Relation<Owner>;
}
