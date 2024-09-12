import { NextFunction, Request, Response } from "express";
import Helper from "../../helpers/responseData";
import UsersService from "../../services/usersService";
import { v4 } from "uuid";
import { hash } from "bcryptjs";
import Users from "../../db//models/Users";
import ErrorBase from "../../errors/errorBase";

const usersService = new UsersService();

class UsersController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const allUsers = await usersService.getAll();
			return res
				.status(200)
				.send(Helper.ResponseData(201, null, null, allUsers));
		} catch (error) {
			next(error);
		}
	}

	static async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const user = await usersService.findOne(id);
			return res.status(200).send(Helper.ResponseData(200, null, null, user));
		} catch (error) {
			next(error);
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const id = v4();
			const passwordHash = await hash(req.body.password, 8);

			const user = await Users.findOne({
				attributes: ["id", "name", "password"],
				where: {
					name: req.body.name,
				},
			});

			if (user) {
				throw new ErrorBase("Name is invalid", 400);
			}

			const userCreated = await usersService.create({
				id,
				...req.body,
				password: passwordHash,
			});
			return res
				.status(201)
				.send(Helper.ResponseData(201, null, null, userCreated));
		} catch (error) {
			next(error);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const user = await Users.findOne({
				attributes: ["id", "name", "password"],
				where: {
					name: req.body.name,
				},
			});

			if (user) {
				throw new ErrorBase("Name is invalid", 400);
			}

			await usersService.update(req.body, id);

			const userUpdated = await usersService.findOne(id);

			return res
				.status(200)
				.send(Helper.ResponseData(200, null, null, userUpdated));
		} catch (error) {
			next(error);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			await usersService.delete(id);
			return res.status(204).send(Helper.ResponseData(200, null, null, null));
		} catch (error) {
			next(error);
		}
	}
}

export default UsersController;
