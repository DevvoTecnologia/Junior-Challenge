import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CriarUserDTO, BuscarTodosAneisDTO } from "../dtos/user.dto";
import { MESSAGES } from "../utils/ring.messages";

const userService = new UserService();

export const criarUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const dto: CriarUserDTO = req.body;
        await userService.createCustomer(dto);
        res.status(201).json({ message: MESSAGES.USER_CREATED.message });
    } catch (error) {
        res.status(500).json({ error: MESSAGES.CREATION_USER_ERROR.message});
    }
};

export const buscarTodosAneis = async (req: Request, res: Response): Promise<void> => {
    try {
        const dto: BuscarTodosAneisDTO = req.body;
        const { userId } = dto;
        const aneis = await userService.buscarTodosAneis(dto);
        res.status(200).json({
            message: MESSAGES.ANEIS_LISTED.message,
            data: aneis
        });
    } catch (error) {
        res.status(500).json({ error: MESSAGES.LIST_ERROR.description });
    }
};
