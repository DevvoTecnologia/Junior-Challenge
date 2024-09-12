import { Request, Response } from 'express';
import { RingService } from '../services/RingService';
import { ForjadoPor } from '../models/Ring';

export class RingController {
    private ringService: RingService;

    constructor() {
        this.ringService = new RingService();
    }

    async createRing(req: Request, res: Response): Promise<Response> {
        const { nome, poder, portador, forjadoPor, imagem } = req.body;

        if (!Object.values(ForjadoPor).includes(forjadoPor)) {
            return res.status(400).json({ message: 'Forjador inválido!' });
        }

        try {
            const result = await this.ringService.createRing(nome, poder, portador, forjadoPor, imagem);
            
            if (typeof result === 'string') {
                return res.status(400).json({ message: result });
            }

            return res.status(201).json({
                message: 'Anel criado com sucesso',
                ring: result
            });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar o anel', error });
        }
    }

    async getAllRings(req: Request, res: Response): Promise<Response> {
        try {
            const rings = await this.ringService.getAllRings();
            return res.status(200).json(rings);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar os anéis', error });
        }
    }

    async getRingById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const ring = await this.ringService.getRingById(Number(id));
            if (!ring) {
                return res.status(404).json({ message: 'Anel não encontrado.' });
            }
            return res.status(200).json(ring);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao recuperar o anel', error });
        }
    }

    async updateRing(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { nome, poder, portador, forjadoPor, imagem } = req.body;

        if (!Object.values(ForjadoPor).includes(forjadoPor)) {
            return res.status(400).json({ message: 'Forjador inválido!' });
        }
        try {
            const updatedRing = await this.ringService.updateRing(parseInt(id), nome, poder, portador, forjadoPor, imagem);
            if (!updatedRing) {
                return res.status(400).json({ message: 'Limite de anéis excedido para o forjador!' });
            }
    
            return res.status(200).json(updatedRing);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar o anel', error });
        }
    }

    async deleteRing(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id, 10);

        try {
            const result = await this.ringService.deleteRing(id);
            if (result === 'Anel não encontrado') {
                return res.status(404).json({ message: result });
            }
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar o anel', error });
        }
    }


}
