import { Request, Response } from "express";
import { PortadorService } from "../services/portador.service";
import { CriarPortadorDTO, BuscarTodosAneis } from "../dtos/portador.dto";

const portadorService = new PortadorService();

export const criarPortador = async (req: Request, res: Response): Promise<void> => {
    try {
        const dto: CriarPortadorDTO = req.body;
        await portadorService.createCustomer(dto);
        res.status(201).send();
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar portador" });
    }
};

export const buscarTodosAneis = async (req: Request, res: Response): Promise<void> => {
    try {
        const { portadorId } = req.body;

        const aneis = await portadorService.buscarTodosAneis({ portadorId });
        res.status(200).send({
            portadorId,
            aneis
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao buscar aneis" });
    }
};
