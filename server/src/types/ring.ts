export type ForgedBy = "Elfos" | "Anões" | "Homens" | "Sauron";

export interface RingAttributes {
	id: string;
	name: string;
	power: string;
	bearer: string;
	forgedBy: ForgedBy;
	image: string;
}

export interface Ring {
	id: number;
	name: string;
	power: string;
	bearer: string;
	forgedBy: ForgedBy;
	image: string;
}

export const rings: Ring[] = [];

export const ringLimits: Record<ForgedBy, number> = {
	Elfos: 3,
	Anões: 7,
	Homens: 9,
	Sauron: 1,
};
