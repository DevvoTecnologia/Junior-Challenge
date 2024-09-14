import { AppDataSource } from "../utils/data-source";
import { User } from "../models/User";
import type { DeleteResult } from "typeorm";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (data: Partial<User>): Promise<User> => {
	const User = userRepository.create(data);
	return await userRepository.save(User);
};

export const getAllUser = async (): Promise<User[]> => {
	return await userRepository.find({
		relations: {
			rings: true,
		},
	});
};

export const existUserByEmail = async (email: string): Promise<boolean> => {
	const user = await userRepository.findOneBy({ email });

	if (user) {
		return true;
	}

	return false;
};

export const getByEmail = async (email: string): Promise<User | null> => {
	return await userRepository.findOneBy({ email });
};

export const deleteUser = async (id: string): Promise<DeleteResult> => {
	return await userRepository.delete(id);
};
