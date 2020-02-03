import { UseCaseResult } from '../UseCaseResult';
import { UseCaseTerminationStatus } from '..';
import { ErrorDescription } from 'src/domain/errors/operation/by-user/values/ErrorDescription';

export class UseCaseInputSyntaxErrorResult implements UseCaseResult {
  terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.InputSyntaxError;
  data: ErrorDescription[];

  constructor(public readonly syntaxErrors: ErrorDescription[]) {
    this.data = syntaxErrors;
  }
}
