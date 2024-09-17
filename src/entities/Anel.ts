import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Usuario from '../entities/Usuario';

@Entity('aneis')
export default class Anel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string = '';

  @Column()
  poder: string = '';

  @Column()
  imagem: string = '';

  @Column()
  descricao: string = '';

  @ManyToOne(() => Usuario, (usuario) => usuario.portadorAneis)
  portador!: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.forjadoPorAneis)
  forjadoPor!: Usuario;
}