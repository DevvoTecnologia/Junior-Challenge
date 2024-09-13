import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDTO } from "../dtos/auth.dto";
import { MESSAGES } from "../utils/auth.messages";  // Certifique-se de que o caminho está correto

const authService = new AuthService();

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const dto: LoginDTO = req.body;
        const authorization = await authService.login(dto);
        res.status(200).json({
            message: MESSAGES.LOGIN_SUCCESS.message,
            data: authorization
        });
    } catch (error) {
        console.error(error);  // Adicionado para depuração
        res.status(500).json({ error: MESSAGES.LOGIN_ERROR.description });
    }
};
