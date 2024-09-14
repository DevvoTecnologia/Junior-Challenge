import { IBodyLogin, IResponseLogin } from "@/types/IUser";
import httpService from "../api";
import { IResponse } from "@/types/IResponse";

export const LoginServices = {
	login: async (body: IBodyLogin): Promise<IResponse<IResponseLogin>> => {
		return httpService.post("/login", body);
	},
};
