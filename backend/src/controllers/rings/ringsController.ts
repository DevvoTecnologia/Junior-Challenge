import { NextFunction, Request, Response } from "express";
import Helper from "../../helpers/responseData";
import RingsService from "../../services/ringsService";
import { v4 } from "uuid";

import { EnumForgedBy } from "../../types/EnumForgedBy";
import ErrorBase from "../../errors/errorBase";

const { BASEURL } = process.env;
const ringsService = new RingsService();

class RingsController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const allRings = await ringsService.getAll();
			return res
				.status(200)
				.send(Helper.ResponseData(200, null, null, allRings));
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const oneRing = await ringsService.findOne(id);
			return res
				.status(200)
				.send(Helper.ResponseData(200, null, null, oneRing));
		} catch (error) {
			next(error);
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		const { filename: path }: any = req.file;
		const id = v4();

		const validateCanForgeNew = (quantity: number) => {
			const forger: string = req.body.forged_by;

			switch (forger.toLowerCase()) {
				case EnumForgedBy.ELFOS.key:
					return quantity < EnumForgedBy.ELFOS.max;
					break;
				case EnumForgedBy.ANOES.key:
					return quantity < EnumForgedBy.ANOES.max;
					break;

				case EnumForgedBy.HOMENS.key:
					return quantity < EnumForgedBy.HOMENS.max;
					break;
				case EnumForgedBy.SAURON.key:
					return quantity < EnumForgedBy.SAURON.max;
					break;

				default:
					false;
					break;
			}
		};

		try {
			const quantityForger = await ringsService.getQuantityByForger(
				req.body.forged_by
			);

			if (validateCanForgeNew(quantityForger)) {
				try {
					const ringCreated = await ringsService.create({
						id,
						image: `${BASEURL}/ring-file/${path}`,
						...req.body,
					});
					return res
						.status(201)
						.send(Helper.ResponseData(201, null, null, ringCreated));
				} catch (err) {
					throw new ErrorBase("Forger exced limit", 400);
				}
			}
		} catch (error) {
			next(error);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		const { filename: path }: any = req.file;
		const { id } = req.params;
		try {
			await ringsService.update(
				{
					image: `${BASEURL}/ring-file/${path}`,
					...req.body,
				},
				id
			);
			const ringUpdated = await ringsService.findOne(id);

			return res
				.status(200)
				.send(Helper.ResponseData(200, null, null, ringUpdated));
		} catch (error) {
			next(error);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			await ringsService.delete(id);
			return res.status(204).send(Helper.ResponseData(200, null, null, null));
		} catch (error) {
			next(error);
		}
	}
}

export default RingsController;
