import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.replace("Bearer ", "");

        if (!token) {
            return res.send({ error: "Token vazio" });
        }

        const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret));

        if (!payload) {
            return res.status(401).send({ error: "Token inválido" });
        }

        req.body.portadorId = payload.id;

        next();
    } catch (error) {
        res.status(500).send({ error: String(error) });
    }
};