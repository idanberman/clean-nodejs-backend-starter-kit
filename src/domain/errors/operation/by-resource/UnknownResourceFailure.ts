import { OperationFailedCausedByResource } from '../OperationFailedCausedByResource';

export class UnknownResourceFailure implements OperationFailedCausedByResource {
  public readonly domainErrorType = 'OperationFailedCausedByResource';
  constructor(
    public readonly componentId: string,
    public readonly actionId: string = 'unknown',
    public readonly causedBy: Error = null,
    public readonly parameters: object = null,
  ) {}
}
