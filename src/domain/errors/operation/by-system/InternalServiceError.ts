import { OperationFailedCausedBySystem } from '..';

export class InternalServiceError implements OperationFailedCausedBySystem {
  public domainErrorType: 'OperationFailedCausedBySystem';

  constructor(
    public readonly componentId: string,
    public readonly actionId: string,
    public readonly causedBy: Error,
    public readonly parameters: object,
  ) {}
}
