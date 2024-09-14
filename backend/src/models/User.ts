import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ring } from "./Ring";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@OneToMany(
		() => Ring,
		(ring) => ring.user,
	)
	rings: Ring[];
}
