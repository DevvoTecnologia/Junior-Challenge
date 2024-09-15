import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Portador } from "./Portador";
import { Forjador } from "./Forjador";

@Entity("rings")
export class Ring {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  poder!: string;

  @Column()
  imagem!: string;

  @ManyToOne(() => Portador, (portador) => portador.rings)
  portador!: Portador;

  @ManyToOne(() => Forjador, (forjador) => forjador.rings)
  forjadoPor!: Forjador;
}
