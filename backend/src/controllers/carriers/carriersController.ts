import { NextFunction, Request, Response } from "express";
import Helper from "../../helpers/responseData";
import CarriersService from "../../services/carriersService";
import { v4 } from "uuid";

const carriersService = new CarriersService();

class CarriersController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const allCarriers = await carriersService.getAll();
			return res
				.status(200)
				.send(Helper.ResponseData(200, null, null, allCarriers));
		} catch (error) {
			next(error);
		}
	}

	static async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const oneCarrier = await carriersService.findOne(id);
			return res
				.status(200)
				.send(Helper.ResponseData(200, null, null, oneCarrier));
		} catch (error) {
			next(error);
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		const { name } = req.body;
		const id = v4();
		try {
			const carrierCreated = await carriersService.create({
				id,
				name,
			});
			return res
				.status(201)
				.send(Helper.ResponseData(201, null, null, carrierCreated));
		} catch (error) {
			next(error);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		const { name } = req.body;
		const { id } = req.params;
		try {
			await carriersService.update(
				{
					id: id,
					name,
				},
				id
			);
			const carrierUpdated = await carriersService.findOne(id);

			return res
				.status(200)
				.send(Helper.ResponseData(200, null, null, carrierUpdated));
		} catch (error) {
			next(error);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			await carriersService.delete(id);
			return res.status(204).send(Helper.ResponseData(200, null, null, null));
		} catch (error) {
			next(error);
		}
	}
}

export default CarriersController;
