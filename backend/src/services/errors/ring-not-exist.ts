export class RingNotExistError extends Error {
  constructor() {
    super(
      "O anel expecificado não existe."
    );
  }
}
