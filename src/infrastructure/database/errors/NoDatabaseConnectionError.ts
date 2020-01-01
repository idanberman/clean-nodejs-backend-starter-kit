export class NoDatabaseConnectionError extends Error {
  constructor() {
    super('No database connection');
  }
}
