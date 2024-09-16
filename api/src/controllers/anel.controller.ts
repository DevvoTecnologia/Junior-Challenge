import { Request, Response } from "express";
import AnelCriarDto from "../dtos/anel-criar.dto";
import { Anel } from "../models";
import AnelAtualizarDto from "../dtos/anel-atualizar.dto";

const imagens: string[] = [
	"https://i0.wp.com/ovicio.com.br/wp-content/uploads/2022/10/20221014-ovicio-os-aneis-de-poder-2a-temporada.jpg?fit=1425%2C765&ssl=1",
	"https://ae-pic-a1.aliexpress-media.com/kf/Hf9cdbaed6ec54c6aa3955578b0b7be1a5.jpg_640x640Q90.jpg_.webp",
	"https://quintacapa.com.br/wp-content/uploads/2021/11/O-Senhor-dos-Aneis-O-Um-Anel-destaque.jpg",
];

const limites: Record<string, number> = {
	Elfos: 3,
	Anões: 7,
	Homens: 9,
	Sauron: 1,
};

export default class AnelController {
	static async listar(req: Request, res: Response) {
		try {
			const listagem = await Anel.find();
			return res.status(200).json(listagem);
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

	static async buscarPorId(req: Request, res: Response) {
		const id = req.params.id;
		try {
			const anel = await Anel.findById(id);
			if (!anel) {
				return res.status(404).json({ message: "Anel não encontrado" });
			}

			return res.status(200).json(anel);
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

	static async criar(req: Request, res: Response) {
		const data: AnelCriarDto = req.body;
		try {
			const count = await Anel.countDocuments({ forjadoPor: data.forjadoPor });
			if (count >= limites[data.forjadoPor]) {
				return res.status(400).json({ message: "Limite de anéis atingido" });
			}

			const imagemAleatoria = imagens[Math.floor(Math.random() * 3)];
			const novo = await Anel.create({ ...data, imagem: imagemAleatoria });
			return res.status(201).json(novo);
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

	static async atualizar(req: Request, res: Response) {
		const id = req.params.id;
		const data: AnelAtualizarDto = req.body;
		try {
			const atualizado = await Anel.findByIdAndUpdate(id, data, { new: true });
			return res.status(200).json(atualizado);
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

	static async deletar(req: Request, res: Response) {
		const id = req.params.id;
		try {
			await Anel.findByIdAndDelete(id);
			return res.status(204).send();
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}
}
