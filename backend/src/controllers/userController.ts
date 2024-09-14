import { HttpStatusCode } from "../types/types";
import { ZodError } from "zod";
import type { Request, Response } from "express";
import { userSchema } from "../utils/zod/user";
import * as jwt from "jsonwebtoken";
import {
	createUser,
	deleteUser,
	existUserByEmail,
	getAllUser,
	getByEmail,
} from "../services/UserService";
import bcrypt from "bcrypt";
import { QueryFailedError } from "typeorm";

const ringController = {
	createUser: async (req: Request, res: Response) => {
		try {
			const body = await userSchema.parseAsync(req.body);
			const existUser = await existUserByEmail(body.email);

			if (existUser) {
				return res.status(HttpStatusCode.conflict).json({
					message: "Já existe uma conta com este email",
				});
			}

			const hashedPassword = await bcrypt.hash(body.password, 10);

			const user = await createUser({
				...body,
				password: hashedPassword,
			});

			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET ?? "",
				{
					expiresIn: "7d",
				},
			);

			return res.status(HttpStatusCode.created).json({
				data: user,
				token,
				message: "A conta foi criada com sucesso, bem vindo(a)!",
			});
		} catch (error) {
			if (error instanceof ZodError) {
				const formattedErrors = error.errors.map((err) => ({
					field: err.path.join("."),
					message: err.message,
				}));

				console.log(formattedErrors);
				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
					errors: formattedErrors,
				});
			}

			console.log(error);
			return res.status(HttpStatusCode.badRequest).json({
				message: "Ocorreu um erro ao criar uma conta",
			});
		}
	},

	getUsers: async (req: Request, res: Response) => {
		try {
			const users = await getAllUser();

			return res
				.status(HttpStatusCode.ok)
				.json({ data: users, message: "Usuários encontrados" });
		} catch (error) {
			console.log(error);
			return res
				.status(HttpStatusCode.badRequest)
				.json({ message: "Ocorreu um erro ao listar os usuários" });
		}
	},

	deleteUser: async (req: Request, res: Response) => {
		try {
			const userId = (req as any).user?.id;

			if (!userId) {
				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
				});
			}

			const deletedUser = await deleteUser(userId);

			if (deletedUser.affected === 0) {
				return res.status(HttpStatusCode.notFound).send({
					message: "Usuário não encontrado",
				});
			}

			return res.status(HttpStatusCode.ok).send({
				message: "Usuário deletado com sucesso!",
			});
		} catch (error) {
			console.log(error);

			if (error instanceof QueryFailedError) {
				return res.status(HttpStatusCode.badRequest).json({
					message: "ID do usuário fornecido é inválido",
				});
			}

			return res.status(HttpStatusCode.badRequest).json({
				message: "Ocorreu um erro ao excluir um usuário",
			});
		}
	},

	login: async (req: Request, res: Response) => {
		try {
			const { email, password } = req.query as {
				email: string;
				password: string;
			};

			if (!email || !password) {
				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
				});
			}

			const user = await getByEmail(email);

			if (!user) {
				return res.status(HttpStatusCode.notFound).json({
					message: "Usuário não encontrado",
				});
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				return res.status(HttpStatusCode.unauthorized).json({
					message: "Senha inválida",
				});
			}

			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET ?? "",
				{
					expiresIn: "7d",
				},
			);

			return res.status(HttpStatusCode.ok).send({
				message: "Login efetuado com sucesso!",
				token,
			});
		} catch (error) {
			console.log(error);

			if (error instanceof QueryFailedError) {
				return res.status(HttpStatusCode.badRequest).json({
					message: "ID do usuário fornecido é inválido",
				});
			}

			return res.status(HttpStatusCode.badRequest).json({
				message: "Ocorreu um erro ao excluir um usuário",
			});
		}
	},
};

export default ringController;
