import { OperationFailedCausedByUser } from '../OperationFailedCausedByUser';
import { FailureCode } from './values/FailureCode';
import { AbstractInvalidArguments } from '..';

export class InvalidInputError
  // For plugin any repository implementation
  extends AbstractInvalidArguments
  implements OperationFailedCausedByUser {
  public readonly domainErrorType: 'OperationFailedCausedByUser';
  public readonly rule: FailureCode = FailureCode.UniqueConstraintViolation;
  public readonly at: string;

  constructor(public readonly errorMessage: string, at?: string) {
    super(at);
  }
}
