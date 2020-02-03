import { InputReceivingResult } from './InputReceivingResult';
import { ErrorDescription } from 'src/domain/errors/operation/by-user/values/ErrorDescription';

export class InputReceivingFailedResult implements InputReceivingResult {
  private constructor(public readonly fieldSyntaxErrors: ErrorDescription[]) {}

  isSucceed(): boolean {
    return false;
  }

  static create(
    fieldSyntaxErrors: ErrorDescription[],
  ): InputReceivingFailedResult {
    return new InputReceivingFailedResult(fieldSyntaxErrors);
  }
}
