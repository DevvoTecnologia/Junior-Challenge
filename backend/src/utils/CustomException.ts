import { HttpException, HttpStatus } from '@nestjs/common';

interface ExceptionParams {
  errorCode: string;
  errorDescription: string;
  statusCode: 400 | 404 | 409;
}

interface StatusCodeDictionary {
  [key: number]: HttpStatus;
}

/**
 * Dictionary to map selected http status
 *
 * @type {StatusCodeDictionary}
 */
const statusCodeDictionary: StatusCodeDictionary = {
  /**
   * Status for invalid request.
   */
  400: HttpStatus.BAD_REQUEST,

  /**
   * Status for not found resource.
   */
  404: HttpStatus.NOT_FOUND,

  /**
   * Status for conflicts of information.
   */
  409: HttpStatus.CONFLICT,
};

export class CustomException extends HttpException {
  constructor({ errorCode, errorDescription, statusCode }: ExceptionParams) {
    super(
      {
        error_code: errorCode,
        error_description: errorDescription,
      },
      statusCodeDictionary[statusCode],
    );
  }
}
