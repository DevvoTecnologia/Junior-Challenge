import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp
} from "typeorm";

@Entity('ring')
export class Ring {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  power: string;

  @Column("varchar")
  carrier: string;

  @Column("varchar")
  forged: string;
  @Column("varchar")
  image: string;

  @Column("timestamp with time zone")
  createdAt: Timestamp;
}