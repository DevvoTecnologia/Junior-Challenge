import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ring } from "./Ring";

@Entity("forjadores")
export class Forjador {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  limite_aneis!: number;

  @OneToMany(() => Ring, (ring) => ring.forjadoPor)
  rings!: Ring[];
}
