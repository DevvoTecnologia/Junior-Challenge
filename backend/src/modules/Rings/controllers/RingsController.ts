import { Request, Response } from "express";

import dataSource from "../../../database/connection";
import { Ring } from "../entities/Rings";
import fs from "fs";
import path from "path";

const uploadPath = path.resolve(__dirname, "../middleware/uploads");

export default class RingsController {
  public async createRing(req: Request, res: Response): Promise<Response> {
    const ringRepository = dataSource.getRepository(Ring);

    const imageFile = req.file;
    if (!imageFile) {
      return res
        .status(400)
        .json({ message: "Arquivo de imagem é obrigatório" });
    }

    const { name, power, carrier, forgedBy } = req.body;
    if (!name || !power || !carrier || !forgedBy) {
      fs.unlinkSync(imageFile.path);
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const maxLimitByForger = this.getMaxLimitByForger(forgedBy);
    if (maxLimitByForger === null) {
      fs.unlinkSync(imageFile.path);
      return res.status(400).json({ message: "Forjador inválido" });
    }

    try {
      const ringCount = await ringRepository.count({ where: { forgedBy } });

      if (ringCount >= maxLimitByForger) {
        fs.unlinkSync(imageFile.path);
        return res.status(400).json({
          message: `O limite de anéis para o forjador ${forgedBy} foi atingido. Por favor, escolha um forjador diferente.`,
        });
      }

      const imageUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${path.basename(imageFile.filename)}`;

      const ring = ringRepository.create({
        name,
        carrier,
        forgedBy,
        image_url: imageUrl,
        power,
      });

      const savedRing = await ringRepository.save(ring);

      return res.status(201).json(savedRing);
    } catch (error) {
      if (imageFile && imageFile.path) {
        fs.unlinkSync(imageFile.path);
      }

      return res
        .status(500)
        .json({ message: "Erro ao adicionar um novo Anel", error });
    }
  }

  private getMaxLimitByForger(forgedBy: string): number | null {
    switch (forgedBy) {
      case "Elfos":
        return 3;
      case "Anões":
        return 7;
      case "Homens":
        return 9;
      case "Sauron":
        return 1;
      default:
        return null;
    }
  }

  public async getAllRings(req: Request, res: Response): Promise<Response> {
    const ringRepository = dataSource.getRepository(Ring);

    try {
      const rings = await ringRepository.find();
      return res.status(200).json(rings);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar anéis", error });
    }
  }

  public async updateRing(req: Request, res: Response): Promise<Response> {
    const ringRepository = dataSource.getRepository(Ring);

    try {
      const { id } = req.params;
      const { name, power, carrier, forgedBy } = req.body;

      const ringId = parseInt(id, 10);

      if (isNaN(ringId)) {
        return res.status(400).json({ message: "Id inválido" });
      }

      const ring = await ringRepository.findOneBy({ id: ringId });

      if (!ring) {
        return res.status(404).json({ message: "Anel não encontrado" });
      }

      const oldForgedBy = ring.forgedBy;
      const imageFile = req.file;

      if (imageFile) {
        if (ring.image_url) {
          const oldImageFileName = path.basename(
            new URL(ring.image_url).pathname
          );
          const oldImagePath = path.resolve(uploadPath, oldImageFileName);

          console.log("Caminho da imagem antiga:", oldImagePath);
          console.log("Nome do arquivo da imagem antiga:", oldImageFileName);

          try {
            if (fs.existsSync(oldImagePath)) {
              console.log("Imagem antiga encontrada. Tentando remover...");
              fs.unlinkSync(oldImagePath);
              console.log("Imagem antiga removida com sucesso.");
            } else {
              console.log(
                "Imagem antiga não encontrada no caminho:",
                oldImagePath
              );
            }
          } catch (error) {
            console.error("Erro ao remover a imagem antiga:", error);
          }
        }

        ring.image_url = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${path.basename(imageFile.filename)}`;
      }

      ring.name = name || ring.name;
      ring.power = power || ring.power;
      ring.carrier = carrier || ring.carrier;

      if (forgedBy && forgedBy !== oldForgedBy) {
        const maxLimitByNewForger = this.getMaxLimitByForger(forgedBy);
        if (maxLimitByNewForger === null) {
          return res.status(400).json({ message: "Forjador inválido" });
        }

        const ringCountForNewForger = await ringRepository.count({
          where: { forgedBy },
        });

        if (ringCountForNewForger >= maxLimitByNewForger) {
          return res.status(400).json({
            message: `O limite de anéis para o forjador ${forgedBy} foi atingido. Por favor, escolha um forjador diferente.`,
          });
        }
      }

      ring.forgedBy = forgedBy || ring.forgedBy;

      const updatedRing = await ringRepository.save(ring);

      return res.status(200).json(updatedRing);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar o Anel", error });
    }
  }

  public async deleteRing(req: Request, res: Response): Promise<Response> {
    const ringRepository = dataSource.getRepository(Ring);

    try {
      const { id } = req.params;

      const ringId = parseInt(id, 10);

      if (isNaN(ringId)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const ring = await ringRepository.findOneBy({ id: ringId });

      if (!ring) {
        return res.status(404).json({ message: "Anel não encontrado" });
      }

      await ringRepository.remove(ring);

      return res.status(200).json({ message: "Anel deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar o Anel", error });
    }
  }

  public async getRingById(req: Request, res: Response): Promise<Response> {
    const ringRepository = dataSource.getRepository(Ring);

    try {
      const { id } = req.params;
      const ringId = parseInt(id, 10);

      if (isNaN(ringId)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const ring = await ringRepository.findOneBy({ id: ringId });

      if (!ring) {
        return res.status(404).json({ message: "Anel não encontrado" });
      }

      return res.status(200).json(ring);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar o Anel", error });
    }
  }
}
