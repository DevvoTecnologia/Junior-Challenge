import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDTO } from "../dtos/auth.dto";
import { MESSAGES } from "../utils/auth.messages";

const authService = new AuthService();

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const dto: LoginDTO = req.body;
        const authorization = await authService.login(dto);
        res.status(200).json({
            authorization
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
