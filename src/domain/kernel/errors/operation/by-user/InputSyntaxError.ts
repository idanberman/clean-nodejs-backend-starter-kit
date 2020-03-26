import { FailureCode } from './values/FailureCode';
import { UseCaseInputErrorDescription } from './values/UseCaseInputErrorDescription';
import { DomainError } from '../../DomainError';
import { OperationFailedCausedByUser } from '../OperationFailedCausedByUser';

export class InputSyntaxError
  implements OperationFailedCausedByUser, DomainError {
  public domainErrorType: 'OperationFailedCausedByUser' =
    'OperationFailedCausedByUser';
  public at: null;
  public rule: FailureCode = FailureCode.SyntaxError;
  constructor(public readonly errors: UseCaseInputErrorDescription[]) {
    if (!errors || errors.length === 0) {
      throw TypeError(
        'errors are missing, The user does not have information about how to fix it (but that error caused by user).',
      );
    }
  }
}
