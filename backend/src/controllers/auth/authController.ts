import { NextFunction, Request, Response } from "express";
import Helper from "../../helpers/responseData";
import AuthService from "../../services/authService";

const authService = new AuthService();

class AuthController {
	static async login(req: Request, res: Response, next: NextFunction) {
		const { name, password } = req.body;
		try {
			const login = await authService.login({ name, password });
			return res.status(200).send(Helper.ResponseData(200, null, null, login));
		} catch (error: any) {
			next(error);
		}
	}
}

export default AuthController;
