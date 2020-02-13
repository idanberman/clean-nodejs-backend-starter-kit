import { OperationFailedCausedBySystem } from '../OperationFailedCausedBySystem';

export class UnknownSystemFailure implements OperationFailedCausedBySystem {
  public readonly domainErrorType = 'OperationFailedCausedBySystem';
  public readonly componentId: string = 'Unhandled error';
  public readonly actionId: string = 'unknown';
  public readonly parameters: object = null;
  constructor(public readonly causedBy: Error) {}
}
