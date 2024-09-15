import { HttpException, HttpStatus } from "@nestjs/common";

export class RingAlreadyExistsException extends HttpException {

  constructor() {
    super('Ring already exists', HttpStatus.BAD_REQUEST);
  }

}

export class RingMaxCapacityExceededException extends HttpException {
  
  constructor() {
    super('Ring has reached its maximum capacity', HttpStatus.BAD_REQUEST);
  }
}

export class RingNotFoundException extends HttpException {
  
  constructor() {
    super('Ring not found', HttpStatus.NOT_FOUND);
  }
}
