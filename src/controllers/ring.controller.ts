import { Request, Response } from "express";
import { RingService } from "../services/ring.service";
import { CriarAnelDTO, AtualizarAnelDTO } from "../dtos/ring.dto";
import { MESSAGES } from "../utils/ring.messages";

const ringService = new RingService();

const validarDadosAnel = (dto: CriarAnelDTO) => {
    return dto.nome && dto.poder && dto.portador && dto.forjadoPor && dto.imagem && dto.userId;
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
        const anel = await ringService.criarAnel(dto);
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
        const aneis = await ringService.listarAneis(portadorId);
        res.status(201).json({
            message: MESSAGES.ANEIS_LISTED.message,
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

        const anel = await ringService.atualizarAnel(id, dto);
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
        const { id } = req.params;
        const { userId } = req.body;
        await ringService.deletarAnel({ id, userId });

        res.status(200).json({
            message: MESSAGES.ANEL_DELETED.message
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: MESSAGES.DELETE_ERROR.description });
    }
};

