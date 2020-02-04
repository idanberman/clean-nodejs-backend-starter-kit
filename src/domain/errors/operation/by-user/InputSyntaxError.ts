import { OperationFailedCausedByUser } from '..';
import { FailureCode } from './values/FailureCode';
import { ErrorDescription } from './values/ErrorDescription';

export class InputSyntaxError implements OperationFailedCausedByUser {
  public domainErrorType: 'OperationFailedCausedByUser';
  public at: null;
  public rule: FailureCode.SyntaxError;
  constructor(public readonly errors: ErrorDescription[]) {}
}
