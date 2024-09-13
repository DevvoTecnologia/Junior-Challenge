import { Request, Response } from "express";
import { RingRepository } from "../repositories/ring.repository";
import { CriarAnelDTO, AtualizarAnelDTO, DeletarAnelDTO } from "../dtos/ring.dto";
import { MESSAGES } from "../utils/ring.messages";

const ringRepository = new RingRepository();

const validarDadosAnel = (dto: CriarAnelDTO) => {
    return dto.nome && dto.poder && dto.portador && dto.forjadoPor && dto.imagem && dto.portadorId;
};

export const criarAnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const dto: CriarAnelDTO = req.body;
        if (!validarDadosAnel(dto)) {
            res.status(400).json({
                error_code: MESSAGES.INVALID_DATA.code,
                error_description: MESSAGES.INVALID_DATA.description,
            });
            return;
        }
        const anel = await ringRepository.criarAnel(dto);
        res.status(201).json({
            message: MESSAGES.ANEL_CREATED.message,
            data: anel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(
            //@ts-ignore
            MESSAGES[error.message]
        );
    }
};

export const listarAneis = async (req: Request, res: Response): Promise<void> => {
    try {
        const { portadorId } = req.body;
        const aneis = await ringRepository.listarAneis(portadorId);
        res.status(200).json({
            message: "Lista de anéis recuperada com sucesso",
            data: aneis
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: MESSAGES.LIST_ERROR.description });
    }
};

export const atualizarAnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const dto: AtualizarAnelDTO = req.body;

        const anel = await ringRepository.atualizarAnel(id, dto);
        if (!anel) {
            res.status(404).json({
                error_code: MESSAGES.ANEL_NOT_FOUND.code,
                error_description: MESSAGES.ANEL_NOT_FOUND.description,
            });
            return;
        }

        res.status(200).json({
            message: MESSAGES.ANEL_UPDATED.message,
            data: anel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: MESSAGES.UPDATE_ERROR.description });
    }
};

export const deletarAnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        await ringRepository.deletarAnel(id);
        res.status(200).json({
            message: MESSAGES.ANEL_DELETED.message
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: MESSAGES.DELETE_ERROR.description });
    }
};
