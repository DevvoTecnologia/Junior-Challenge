import { Request, Response } from "express";
import { RingRepository } from "../repositories/ring.repository";
import { CriarAnelDTO, AtualizarAnelDTO, DeletarAnelDTO } from "../dtos/ring.dto";

const ringRepository = new RingRepository();

export const criarAnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const dto: CriarAnelDTO = req.body;

        if (!dto.nome || !dto.poder || !dto.portador || !dto.forjadoPor || !dto.imagem || !dto.portadorId || !dto.forjadorId) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos",
            });
            return;
        }

        const anel = await ringRepository.criarAnel(dto);
        res.status(201).json(anel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar anel" });
    }
};

export const listarAneis = async (req: Request, res: Response): Promise<void> => {
    try {
        const aneis = await ringRepository.listarAneis();
        res.status(200).json(aneis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar anéis" });
    }
};

export const atualizarAnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const dto: AtualizarAnelDTO = req.body;

        const anel = await ringRepository.atualizarAnel(id, dto);
        if (!anel) {
            res.status(404).json({
                error_code: "ANEL_NOT_FOUND",
                error_description: "O anel com o ID fornecido não foi encontrado",
            });
            return;
        }

        res.status(200).json(anel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar anel" });
    }
};

export const deletarAnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const dto: DeletarAnelDTO = req.body;

        await ringRepository.deletarAnel(dto);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar anel" });
    }
};