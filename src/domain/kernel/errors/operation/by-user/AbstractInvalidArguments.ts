import { FailureCode } from './values/FailureCode';
import { OperationFailedCausedByUser } from '../OperationFailedCausedByUser';

export abstract class AbstractInvalidArguments
  implements OperationFailedCausedByUser {
  public domainErrorType: 'OperationFailedCausedByUser';
  public abstract rule: FailureCode;
  protected constructor(public readonly at: string) {}
}
