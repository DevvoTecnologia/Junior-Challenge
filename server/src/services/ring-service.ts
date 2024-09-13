import { createId } from "@paralleldrive/cuid2";
import { Ring } from "../models/Ring";
import type { RingAttributes, ForgedBy } from "../types/ring";

const ringLimits: Record<ForgedBy, number> = {
	Elfos: 3,
	Anões: 7,
	Homens: 9,
	Sauron: 1,
};

export const createRing = async (ringData: Omit<RingAttributes, "id">) => {
	const { name, power, bearer, forgedBy, image } = ringData;

	if (!name || !power || !bearer || !forgedBy || !image) {
		throw new Error("Todos os campos são obrigatórios");
	}

	const currentCount = await Ring.count({ where: { forgedBy } });
	if (currentCount >= ringLimits[forgedBy]) {
		throw new Error(`Limite de anéis para ${forgedBy} atingido`);
	}

	return Ring.create({
		id: createId(),
		name,
		power,
		bearer,
		forgedBy,
		image,
	});
};

export const getRings = () => {
	return Ring.findAll();
};

export const updateRing = async (id: string, ringData: Partial<Ring>) => {
	const ring = await Ring.findByPk(id);
	if (ring) {
		return await ring.update(ringData);
	}
	return null;
};

export const deleteRing = async (id: string) => {
	const ring = await Ring.findByPk(id);
	if (ring) {
		await ring.destroy();
		return true;
	}
	return false;
};
