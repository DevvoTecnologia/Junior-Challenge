import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import Helper from "../helpers/responseData";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_AUTH as string;

export default (req: any, res: Response, next: NextFunction) => {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res
			.status(401)
			.send(Helper.ResponseData(401, "Token not provided", true, null));
	}

	const token = authToken.split(" ")[1];

	try {
		jwt.verify(token, secret, function (err: any, decoded: any) {
			if (err) {
				throw new Error();
			}
			req.userId = decoded.id;
			req.userEmail = decoded.email;

			return next();
		});
	} catch (err) {
		return res
			.status(200)
			.send(Helper.ResponseData(401, "Token is invalid", true, null));
	}
};
