import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("rings")
export class Ring {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  power: string;

  @Column()
  carrier: string;

  @Column()
  forgedBy: string;

  @Column()
  image_url: string;
}
