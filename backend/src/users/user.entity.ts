import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Anel } from '../aneis/anel.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => Anel, (anel) => anel.user)
  aneis: Anel[];
}