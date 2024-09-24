import { Request, Response } from "express";
import { RingService } from "../services/ring.service";
import { CriarAnelDTO, AtualizarAnelDTO } from "../dtos/ring.dto";
import { MESSAGES } from "../utils/ring.messages";

const ringService = new RingService();

const validarDadosAnel = (dto: CriarAnelDTO) => {
    return dto.nome && dto.poder && dto.portador && dto.forjadoPor && dto.imagem && dto.userId;
};

export const criarAnel = async (req: Request, res: Response): Promise<void> => {
    const dto: CriarAnelDTO = req.body;
    try {

        if (!validarDadosAnel(dto)) {
            res.status(400).json({
                code: MESSAGES.INVALID_DATA.code,
                message: MESSAGES.INVALID_DATA.description,
            });
            return;
        }
        const anel = await ringService.criarAnel(dto);
        res.status(201).json({
            message: MESSAGES.ANEL_CREATED.message,
            data: anel
        });
    } catch (error) {
        const ringService = new RingService();
        const maxRings = ringService.getMaxRings(dto.forjadoPor);
        const aneisExstentes = await ringService.listarAneisPorForjador(dto.forjadoPor, dto.userId);
        if (aneisExstentes.length >= maxRings) {
            res.status(500).json({
                code: MESSAGES.ANEL_EXCEEDED_LIMIT.code,
                message: MESSAGES.ANEL_EXCEEDED_LIMIT.description
            });
            return;
        }
        console.error(error);
        res.status(500).json({
            code: MESSAGES.CREATION_ERROR.code,
            message: MESSAGES.CREATION_ERROR.description
        });
    }
};

export const listarAneis = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;
        const aneis = await ringService.listarAneis(userId);
        res.status(201).json({
            message: MESSAGES.ANEIS_LISTED.message,
            data: aneis
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: MESSAGES.LIST_ERROR.description });
    }
};

export const atualizarAnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const dto: AtualizarAnelDTO = req.body;

        const anel = await ringService.atualizarAnel(id, dto);
        if (!anel) {
            res.status(404).json({
                code: MESSAGES.ANEL_NOT_FOUND.code,
                message: MESSAGES.ANEL_NOT_FOUND.description,
            });
            return;
        }

        res.status(200).json({
            message: MESSAGES.ANEL_UPDATED.message,
            data: anel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: MESSAGES.UPDATE_ERROR.description });
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
        res.status(500).json({ message: MESSAGES.DELETE_ERROR.description });
    }
};

