import { Request, Response } from 'express'
import Ring, { IRing } from '../models/Ring'

const MAX_RINGS = {
  Elfos: 3,
  Anões: 7,
  Homens: 9,
  Sauron: 1,
}

type Forjador = keyof typeof MAX_RINGS

export const createRing = async (req: Request, res: Response) => {
  const { nome, poder, portador, forjadoPor, imagem } = req.body as {nome: string, poder: string, portador: string, forjadoPor: string, imagem: string}

  try {
    if (!(forjadoPor in MAX_RINGS)) {
        return res.status(400).json({ message: 'Forjador inválido.' })
    }

    const count = await Ring.countDocuments({ forjadoPor })
    if (count >= MAX_RINGS[forjadoPor as Forjador]) {
      return res.status(400).json({ message: `Limite de anéis para ${forjadoPor} atingido.` })
    }

    const ring:IRing = new Ring({
      nome,
      poder,
      portador,
      forjadoPor,
      imagem,
    })

    await ring.save()
    return res.status(201).json(ring)
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar anel', error })
  }
}

export const getAllRings = async (req: Request, res: Response) => {
  try {
    const rings = await Ring.find()
    return res.status(200).json(rings)
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar anéis', error })
  }
}

export const updateRing = async (req: Request, res: Response) => {
  const { id } = req.params as {id: string}
  const { nome, poder, portador, forjadoPor, imagem } = req.body as {nome: string, poder: string, portador: string, forjadoPor: string, imagem: string}

  try {
    const ring = await Ring.findByIdAndUpdate(id, { nome, poder, portador, forjadoPor, imagem }, { new: true })
    if (!ring) {
      return res.status(404).json({ message: 'Anel não encontrado' })
    }

    return res.status(200).json(ring)
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar anel', error })
  }
}

export const deleteRing = async (req: Request, res: Response) => {
  const { id } = req.params as {id: string}

  try {
    const ring = await Ring.findByIdAndDelete(id)
    if (!ring) {
      return res.status(404).json({ message: 'Anel não encontrado' })
    }

    return res.status(200).json({ message: 'Anel deletado com sucesso' })
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar anel', error })
  }
}
