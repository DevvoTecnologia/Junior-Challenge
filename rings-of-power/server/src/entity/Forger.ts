import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Ring } from "./Ring";

export enum TypeForger {
  Elfos = "Elfos",
  Anoes = "Anoes",
  Homens = "Homens",
  Sauron = "Sauron",
}

@Entity()
export class Forger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: TypeForger,
  })
  tipo: TypeForger;

  @OneToMany(() => Ring, (ring) => ring.forjadoPor)
  aneis: Ring[];
}
