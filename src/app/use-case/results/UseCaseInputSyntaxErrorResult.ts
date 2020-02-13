import { UseCaseResult } from './UseCaseResult';
import { UseCaseInputErrorDescription } from 'src/domain/errors/operation/by-user/values/UseCaseInputErrorDescription';
import { UseCaseTerminationStatus } from '../definitions';

export class UseCaseInputSyntaxErrorResult implements UseCaseResult {
  public terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.InputSyntaxError;
  public data: UseCaseInputErrorDescription[];

  constructor(public readonly syntaxErrors: UseCaseInputErrorDescription[]) {
    if (!Array.isArray(syntaxErrors) || syntaxErrors.length === 0) {
      throw new TypeError('No syntax errors found');
    }
    this.data = syntaxErrors;
  }
}
