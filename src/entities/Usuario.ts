import { Entity, PrimaryGeneratedColumn, Column,OneToMany, JoinTable } from "typeorm";
import Anel from '../entities/Anel';

@Entity()
export default class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string = "";

  @Column()
  email: string = "";

  @Column()
  senha: string = "";

  @Column(
    {
      type: 'enum',
      enum: ['elfos', 'anões', 'homens', 'sauron'],
      default: 'homens', 
    }
  )
  race: string = "";

   @OneToMany(() => Anel, (anel) => anel.portador)
   portadorAneis: Anel[] | undefined;
 
   @OneToMany(() => Anel, (anel) => anel.forjadoPor)
   forjadoPorAneis: Anel[] | undefined;
        
}
