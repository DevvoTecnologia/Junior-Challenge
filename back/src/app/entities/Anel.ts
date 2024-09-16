import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TipoForjador } from "../types/TipoForjador";

@Entity('aneis')
export class Anel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 100,
  })
  power: string;

  @Column({
    length: 100,
  })
  holder: string;

  @Column({
    type: "enum",
    enum: TipoForjador,
  })
  forger: TipoForjador;
}
