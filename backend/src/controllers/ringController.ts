import { Request, Response } from 'express'
import { RingService } from '../services/ringServices'
import { Forger } from '../models/ringModel'

const ringService = new RingService()

export const createRing = async (req: Request, res: Response) => {
    try {
        const { name, power, carrier, forgedBy, image } = req.body

        if (!Object.values(Forger).includes(forgedBy)) {
            return res.status(400).json({ message: 'Forjador inválido' })
        }

        const newRing = await ringService.createRing({ name, power, carrier, forgedBy, image })
        res.status(201).json(newRing)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

// Listar todos os anéis
export const listRings = async (req: Request, res: Response) => {
    try {
        const rings = await ringService.listRings()
        res.status(200).json(rings)
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao listar os anéis' })
    }
}

// Atualizar um anel
export const updateRing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params 
        const { name, power, carrier, forgedBy, image } = req.body

        if (!Object.values(Forger).includes(forgedBy)) {
            return res.status(400).json({ message: 'Forjador inválido' })
        }

        const updatedRing = await ringService.updateRing(id, { name, power, carrier, forgedBy, image })
        res.status(200).json(updatedRing)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

// Deletar um anel
export const deleteRing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params  

        const deletedRing = await ringService.deleteRing(id)
        res.status(200).json({ message: 'Anel deletado com sucesso', deletedRing })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

