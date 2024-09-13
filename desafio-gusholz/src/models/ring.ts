import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type AnelModel = {
  "id": number,
  "nome": string,
  "forjadoPor": string,
  "imagem": string,
  "poder": string,
  "portador": string
}

@Entity()
export class Anel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  poder!: string;

  @Column()
  portador!: string;

  @Column()
  forjadoPor!: string;

  @Column()
  imagem!: string;
}
