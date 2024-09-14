import { IBodyRings, IRings } from "@/types/IRings";
import httpService from "../api";
import { IResponse } from "@/types/IResponse";

export const RingServices = {
	getAll: async (): Promise<IResponse<IRings[]>> => {
		return httpService.get("/rings");
	},

	getById: async (id: string): Promise<IResponse<IRings>> => {
		return httpService.get(`/rings/${id}`);
	},

	delete: async (id: string): Promise<null> => {
		return httpService.get(`/rings/${id}`);
	},

	create: async (body: IBodyRings): Promise<any> => {
		return await httpService.post(`/rings`, body, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
	update: async ({
		body,
		id,
	}: {
		body: IBodyRings;
		id: string;
	}): Promise<any> => {
		return await httpService.post(`/rings/${id}`, body, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
};
