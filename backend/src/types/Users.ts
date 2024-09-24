export interface UsersAttributes {
	id: string;
	name: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UserInput extends Omit<UsersAttributes, "id"> {}
export interface UserOutput extends Required<UsersAttributes> {}
