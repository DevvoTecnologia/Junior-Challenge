import type { Request, Response } from "express";
import * as authService from "../services/auth-service";

export const register = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await authService.registerUser(username, password);
		res
			.status(201)
			.json({ message: "Usuário registrado com sucesso", userId: user.id });
	} catch (error) {
		console.error("Erro ao registrar usuário:", error);
		if (error instanceof Error) {
			res
				.status(400)
				.json({ message: "Erro ao registrar usuário", error: error.message });
		} else {
			res.status(400).json({
				message: "Erro ao registrar usuário",
				error: "Erro desconhecido",
			});
		}
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const result = await authService.loginUser(username, password);
		res.json(result);
	} catch (error) {
		res.status(401).json({ message: "Credenciais inválidas" });
	}
};
