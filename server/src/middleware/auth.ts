import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ message: "Token não fornecido" });
	}

	const [, token] = authHeader.split(" ");

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
		(req as Request & { userId: string }).userId = decoded.userId;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Token inválido" });
	}
};
