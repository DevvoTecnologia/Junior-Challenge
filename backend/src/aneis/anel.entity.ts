import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Anel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  poder: string;

  @Column()
  portador: string;

  @Column()
  forjadoPor: string;

  @Column()
  imagem: string;

  @ManyToOne(() => User, (user) => user.aneis)
  user: User;
}
