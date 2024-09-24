import { Response } from "express";
import Helper from "../helpers/responseData";

class ErrorBase extends Error {
	status: number;
	message: string;
	constructor(message = "Internal Server Error", status = 500) {
		super();
		this.message = message;
		this.status = status;
	}

	sendResponse(res: Response) {
		res
			.status(this.status)
			.send(Helper.ResponseData(this.status, this.message, true, null));
	}
}

export default ErrorBase;
