import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Forger } from "./Forger";
import { Holder } from "./Holder";

@Entity()
export class Ring {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  poder: string;

  @ManyToOne(() => Forger, (forger) => forger.aneis, { onDelete: "CASCADE" })
  forjadoPor: Forger;

  @ManyToOne(() => Holder, (holder) => holder.aneis, { onDelete: "CASCADE" })
  portador: Holder;

  @Column()
  imagem: string;
}
