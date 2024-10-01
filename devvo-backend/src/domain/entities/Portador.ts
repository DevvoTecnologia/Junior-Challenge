import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ring } from "./Ring";

@Entity("portadores")
export class Portador {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @OneToMany(() => Ring, (ring) => ring.portador)
  rings!: Ring[];
}
