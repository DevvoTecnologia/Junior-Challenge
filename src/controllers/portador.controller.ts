import { Request, Response } from "express";
import { PortadorService } from "../services/portador.service";
import { CriarPortadorDTO, BuscarTodosAneisDTO } from "../dtos/portador.dto";
import { MESSAGES } from "../utils/ring.messages";

const portadorService = new PortadorService();

export const criarPortador = async (req: Request, res: Response): Promise<void> => {
    try {
        const dto: CriarPortadorDTO = req.body;
        await portadorService.createCustomer(dto);
        res.status(201).json({ message: MESSAGES.PORTADOR_CREATED.message });
    } catch (error) {
        res.status(500).json({ error: MESSAGES.CREATION_ERROR.description });
    }
};

export const buscarTodosAneis = async (req: Request, res: Response): Promise<void> => {
    try {
        const dto: BuscarTodosAneisDTO = req.body;
        const { portadorId } = dto;
        const aneis = await portadorService.buscarTodosAneis(dto);
        res.status(200).json({
            message: MESSAGES.ANEIS_LISTED.message,
            data: aneis
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: MESSAGES.LIST_ERROR.description });
    }
};
