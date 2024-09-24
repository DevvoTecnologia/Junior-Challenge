import { NextFunction, Request, Response } from "express";
import ErrorBase from "../errors/errorBase";
import ErrorNotFound from "../errors/errorNotFound";

const errorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof ErrorNotFound) {
		new ErrorNotFound().sendResponse(res);
	} else if (error instanceof ErrorBase) {
		error.sendResponse(res);
	} else {
		new ErrorBase().sendResponse(res);
	}
};

export default errorHandler;
