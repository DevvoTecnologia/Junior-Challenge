import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { Usuario } from "../models";
import { criarToken, getTokenDataExpiracao } from "../utils/token.util";
import RegistrarDTO from "../dtos/registrar.dto";
import EntrarDTO from "../dtos/entrar.dto";

export const SALT_ROUNDS = 10;

export default class AuthController {
	static async registrar(req: Request, res: Response) {
		const { nome, email, senha, confirmarSenha }: RegistrarDTO = req.body;

		if (senha !== confirmarSenha) {
			return res.status(400).json({ message: "As senhas devem ser iguais" });
		}

		try {
			const senhaCriptografada = bcryptjs.hashSync(senha, SALT_ROUNDS);
			const usuario = await Usuario.create({ nome, email, senha: senhaCriptografada });
			const token = criarToken(usuario._id);

			return res
				.cookie("access_token", token, {
					httpOnly: true,
					expires: getTokenDataExpiracao(),
				})
				.status(201)
				.json(usuario);
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}

	static async entrar(req: Request, res: Response) {
		const { email, senha }: EntrarDTO = req.body;

		try {
			const usuario = await Usuario.findOne({ email });
			if (!usuario) {
				return res.status(404).json({ message: "Usuário ja existe" });
			}

			const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha as string);
			if (!senhaCorreta) {
				return res.status(401).json("Credentials inválidas!");
			}

			const token = criarToken(usuario._id);
			return res
				.cookie("access_token", token, {
					httpOnly: true,
					expires: getTokenDataExpiracao(),
				})
				.status(200)
				.json(usuario);
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

	static async buscarUsuario(req: any, res: Response) {
		const id = req.userId;
		try {
			const usuario = await Usuario.findById(id);
			if (!usuario) {
				return res.status(404).json({ message: "Usuário não encontrado" });
			}

			return res.status(200).json(usuario);
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}
}
