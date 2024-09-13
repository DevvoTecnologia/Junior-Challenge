export interface Ring {
	id: string;
	name: string;
	power: string;
	bearer: string;
	forgedBy: string;
	image?: string;
	createdAt: string;
	updatedAt: string;
}

export type RingFormData = {
	name: string;
	power: string;
	bearer: string;
	forgedBy: string;
	image?: string;
};
