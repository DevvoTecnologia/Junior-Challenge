import { ValidationError } from "yup";
import { NextFunction, Request, Response } from "express";
import Helper from "../helpers/responseData";

export default (schema: any) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateSync(req.body, { abortEarly: false });
			next();
		} catch (error) {
			const { name, message, errors } = error as ValidationError;
			console.log(errors);
			res.status(401).send(Helper.ResponseData(401, name, errors, null));
		}
	};
