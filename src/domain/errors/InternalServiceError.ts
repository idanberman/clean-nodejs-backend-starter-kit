export class InternalServiceError extends Error {
  constructor(public readonly message: string, public readonly cause: Error) {
    super(message);
  }
}
