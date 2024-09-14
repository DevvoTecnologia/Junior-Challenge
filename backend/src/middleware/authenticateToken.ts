import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserDb } from "../utils/zod/user";
import { HttpStatusCode } from "../types/types";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(" ")[1];

	if (!token) {
		return res.status(HttpStatusCode.unauthorized).json({
			message: "Acesso negado, token não encontrado",
		});
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string,
		) as UserDb;
		(req as any).user = decoded;
		next();
	} catch (err) {
		return res.status(403).json({
			message: "Token inválido",
		});
	}
};

export default authenticateToken;
