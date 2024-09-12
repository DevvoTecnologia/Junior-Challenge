import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Ring {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	power: string;

	@Column()
	bearer: string;

	@Column()
	forgedBy: string;

	@Column()
	image: string;
}
