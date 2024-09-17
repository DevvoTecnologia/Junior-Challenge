import Ring from "../models/ring.model";
import { Request, Response } from "express";

export const checkRingPorters = async (req: Request, res: Response, porter: string): Promise<boolean> => {
    const ringsByPorter = await Ring.aggregate([
        {
            $group: {
                _id: "$portador",
                count: { $sum: 1 }
            }
        }
    ]);

    const getCountByPorter = (porter: string) => {
        return ringsByPorter.find(ring => ring._id === porter)?.count || 0;
    }

    switch (porter) {
        case "homem":
            const countHomem = getCountByPorter("homem");
            if (countHomem >= 9) {
                res.status(400).json({ message: "Já existem 9 homens portando anéis. Não é possível criar mais anéis." });
                return false; 
            }
            break;
        case "elfo":
            const countElfo = getCountByPorter("elfo");
            if (countElfo >= 3) {
                res.status(400).json({ message: "Já existem 3 elfos portando anéis. Não é possível criar mais anéis." });
                return false;
            }
            break;
        case "anão":
            const countAnao = getCountByPorter("anão");
            if (countAnao >= 7) {
                res.status(400).json({ message: "Já existem 7 anões portando anéis. Não é possível criar mais anéis." });
                return false;
            }
            break;

        case "sauron":
            const countSauron = getCountByPorter("sauron");
            if (countSauron >= 1) {
                res.status(400).json({ message: "Sauron já possui um anel. Não é possível criar outro." });
                return false;
            }
            break;
        
        default:
            res.status(400).json({ message: "Portador inválido." });
            return false;
    }
    
    return true;
};