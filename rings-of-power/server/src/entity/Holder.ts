import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ring } from "./Ring";

@Entity()
export class Holder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Ring, (ring) => ring.portador) aneis: Ring[];
}
