import ErrorBase from "./errorBase";

class ErrorNotFound extends ErrorBase {
	constructor(message = "Not Found") {
		super(message, 404);
	}
}

export default ErrorNotFound;
