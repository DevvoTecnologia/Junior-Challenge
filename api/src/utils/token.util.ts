import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

function criarToken(_id: mongoose.Types.ObjectId): string {
	const token = jwt.sign({ id: _id }, process.env.JWT_SECRET as string);
	return token;
}

function getTokenDataExpiracao(): Date {
	return new Date(Date.now() + 24 * 60 * 60 * 1000);
}

function getToken(req: any): string {
	const token = req.cookies.access_token;
	return token;
}

function middlewareVerificaToken(req: any, res: any, next: NextFunction) {
	try {
		const token = getToken(req);
		const verified: any = jwt.verify(token, process.env.JWT_SECRET as string);
		req.userId = verified.id;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Token inválido" });
	}
}

export { criarToken, getTokenDataExpiracao, middlewareVerificaToken };
