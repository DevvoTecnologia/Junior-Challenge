import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ring {
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
