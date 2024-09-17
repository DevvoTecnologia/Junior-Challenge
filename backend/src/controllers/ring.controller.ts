import Ring from "../models/ring.model";
import { Request, Response } from "express";
import {checkRingPorters} from "../rules/rings.rules"


export const createRing = async (req: Request, res: Response) => {
    try {
        const {portador} = req.body;

        const canCreateRing = await checkRingPorters(req, res, portador);
        if (!canCreateRing) return;

        const ring = await Ring.create(req.body);
        res.status(200).json({ message: "Anel criado!", ring: ring})
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const listAllRings = async (req: Request, res: Response) => {
    try {
        const ringsList = await Ring.find({});
        res.status(200).json(ringsList)
    } catch (error) {
        res.status(500).json({ message: error })
    }
};  

export const findRing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ring = await Ring.findById(id);
        if (!ring) {
            return res.status(404).json({ message: "Anel não encontrado" });
        }
        res.status(200).json(ring);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateRing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ring = await Ring.findByIdAndUpdate(id, req.body);

        if (!ring) {
            return res.status(404).json({ message: "Este Anel não existe!" })
        }

        const updatedRing = await Ring.findById(id)
        res.status(200).json({ message: "As informações do Anel foram atualizadas.", ring: updatedRing })
    } catch (error) {
        res.status(500).json({ message: error })
    }
};

export const deleteRing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ring = await Ring.findByIdAndDelete(id);

        if (!ring) {
            return res.status(404).json({ message: "Este Anel não existe!" })
        }

        res.status(200).json({ message: "O Anel foi destruído com sucesso." })
    } catch (error) {
        res.status(500).json({ message: error })
    }
};
