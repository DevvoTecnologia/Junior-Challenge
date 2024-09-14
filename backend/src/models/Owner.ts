import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Ring } from './Ring';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString({ message: 'O nome do proprietário deve ser uma string' })
  @IsNotEmpty({ message: 'O nome do proprietário não pode estar vazio' })
  @MaxLength(255, { message: 'O nome do proprietário não pode ter mais de 255 caracteres' })
  name: string;

  @OneToMany(() => Ring, (ring) => ring.currentOwner)
  rings: Relation<Ring[]>;
}
