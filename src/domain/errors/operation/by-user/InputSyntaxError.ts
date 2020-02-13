import { FailureCode } from './values/FailureCode';
import { UseCaseInputErrorDescription } from './values/UseCaseInputErrorDescription';
import { DomainError } from '../../DomainError';
import { OperationFailedCausedByUser } from '../OperationFailedCausedByUser';

export class InputSyntaxError
  implements OperationFailedCausedByUser, DomainError {
  public domainErrorType: 'OperationFailedCausedByUser' =
    'OperationFailedCausedByUser';
  public at: null;
  public rule: FailureCode.SyntaxError;
  constructor(public readonly errors: UseCaseInputErrorDescription[]) {}
}
