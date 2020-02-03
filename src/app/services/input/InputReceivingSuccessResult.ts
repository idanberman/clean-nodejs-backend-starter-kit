import { InputReceivingResult } from './InputReceivingResult';

export class InputReceivingSuccessResult<T> implements InputReceivingResult {
  private constructor(public readonly value: any) {}

  isSucceed(): boolean {
    return true;
  }

  static create<T>(value: any): InputReceivingSuccessResult<T> {
    return new InputReceivingSuccessResult(value);
  }
}
