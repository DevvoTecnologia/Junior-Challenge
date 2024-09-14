import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

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

	@ManyToOne(
		() => User,
		(user) => user.rings,
	)
	user: User;

	@Column()
	forgedBy: string;

	@Column()
	image: string;
}
