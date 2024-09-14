import { HttpStatusCode } from "../types/types";

type Limits = {
	[key: string]: number;
};

const limits: Limits = {
	Elfos: 3,
	Anões: 7,
	Homens: 9,
	Sauron: 1,
};

export const checkForgingLimit = async (
	forgedBy: string,
	userId: string,
	getCountByForgedBy: (forgedBy: string, userId: string) => Promise<number>,
) => {
	const countByForgedBy = await getCountByForgedBy(forgedBy, userId);

	const limit = limits[forgedBy as keyof typeof limits];

	if (limit !== undefined && countByForgedBy >= limit) {
		return {
			statusCode: HttpStatusCode.conflict,
			message: `${forgedBy} podem forjar no máximo ${limit} ${limit > 1 ? "anéis" : "anel"}`,
		};
	}

	return null;
};
