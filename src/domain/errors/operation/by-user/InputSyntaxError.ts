import { OperationFailedCausedByUser } from '..';
import { FailureCode } from './values/FailureCode';
import { UseCaseInputErrorDescription } from './values/UseCaseInputErrorDescription';
import { DomainError } from '../../DomainError';

export class InputSyntaxError
  implements OperationFailedCausedByUser, DomainError {
  public domainErrorType: 'OperationFailedCausedByUser' =
    'OperationFailedCausedByUser';
  public at: null;
  public rule: FailureCode.SyntaxError;
  constructor(public readonly errors: UseCaseInputErrorDescription[]) {}
}
