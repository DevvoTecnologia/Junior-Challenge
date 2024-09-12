import { Ring } from "../models/Ring";
import { AppDataSource } from "../utils/data-source";

const ringRepository = AppDataSource.getRepository(Ring);

export const createRing = async (data: Partial<Ring>): Promise<Ring> => {
	const ring = ringRepository.create(data);
	return await ringRepository.save(ring);
};

export const getRings = async (): Promise<Ring[]> => {
	return await ringRepository.find();
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

export const deleteRing = async (id: string): Promise<void> => {
	await ringRepository.delete(id);
};
