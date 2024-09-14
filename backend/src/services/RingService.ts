import type { DeleteResult } from "typeorm";
import { Ring } from "../models/Ring";
import { AppDataSource } from "../utils/data-source";
import { User } from "../models/User";

const ringRepository = AppDataSource.getRepository(Ring);

export const createRing = async (
	data: Partial<Ring>,
	userId: string,
): Promise<Ring> => {
	const user = await AppDataSource.getRepository(User).findOne({
		where: { id: userId },
	});

	if (!user) {
		throw new Error("Usuário não encontrado");
	}

	const ring = ringRepository.create({
		...data,
		user,
	});

	return await ringRepository.save(ring);
};
export const getRings = async (userId: string): Promise<Ring[]> => {
	return await ringRepository.findBy({ user: { id: userId } });
};

export const getRingById = async (id: string): Promise<Ring | null> => {
	return await ringRepository.findOne({
		where: { id },
		relations: {
			user: true,
		},
	});
};

export const getCountByForgedBy = async (
	forgedBy: string,
	userId: string,
): Promise<number> => {
	const count = await ringRepository.count({
		where: { forgedBy, user: { id: userId } },
	});
	return count;
};

export const updateRing = async (
	id: string,
	newData: Partial<Ring>,
): Promise<Ring | null> => {
	await ringRepository.update(id, newData);
	return ringRepository.findOne({
		where: { id },
	});
};

export const deleteRing = async (id: string): Promise<DeleteResult> => {
	return await ringRepository.delete(id);
};
