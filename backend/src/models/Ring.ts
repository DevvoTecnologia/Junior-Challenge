import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Owner } from './Owner';

@Entity()
export class Ring {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString({ message: 'O nome do anel deve ser uma string' })
  @IsNotEmpty({ message: 'O nome do anel não pode estar vazio' })
  @MaxLength(255, { message: 'O nome do anel não pode ter mais de 255 caracteres' })
  name: string;

  @Column({ type: 'text' })
  @IsString({ message: 'O poder do anel deve ser uma string' })
  @IsNotEmpty({ message: 'O poder do anel não pode estar vazio' })
  power: string;

  @Column({
    type: 'enum',
    enum: ['Elfos', 'Anões', 'Humanos', 'Sauron'],
  })
  @IsString({ message: 'O forjador do anel deve ser uma string' })
  @IsNotEmpty({ message: 'O forjador do anel não pode estar vazio' })
  @IsIn(['Elfos', 'Anões', 'Humanos', 'Sauron'], {
    message: 'O forjador do anel deve ser uma dessas opções: Elfos, Anões, Humanos ou Sauron',
  })
  forgedBy: 'Elfos' | 'Anões' | 'Humanos' | 'Sauron';

  @Column({ type: 'varchar', length: 255 })
  @IsString({ message: 'A URL da imagem deve ser uma string' })
  @IsNotEmpty({ message: 'A URL da imagem não pode estar vazia' })
  @MaxLength(255, { message: 'A URL da imagem não pode ter mais de 255 caracteres' })
  image: string;

  @ManyToOne(() => Owner, (owner) => owner.rings)
  currentOwner: Relation<Owner>;
}
