import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ring {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ringName!: string;

  @Column()
  power!: string;

  @Column()
  holder!: string;

  @Column()
  madeBy!: string;

  @Column()
  imageUrl!: string;
}
