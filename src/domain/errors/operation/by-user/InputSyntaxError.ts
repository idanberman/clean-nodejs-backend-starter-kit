import { OperationFailedCausedByUser } from '..';
import { FailureCode } from './values/FailureCode';
import { ErrorDescription } from './values/ErrorDescription';

export class InputSyntaxError implements OperationFailedCausedByUser {
  type: 'OperationFailedCausedByUser';
  at: null;
  rule: FailureCode.SyntaxError;
  constructor(public readonly errors: ErrorDescription[]) {}
}
