import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  ring: string;

  @Column()
  power: number;

  @Column()
  proper: string;

  @Column()
  blacksmith: string;
}
