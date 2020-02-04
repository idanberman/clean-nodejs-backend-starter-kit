import { UseCaseResult } from '../UseCaseResult';
import { UseCaseTerminationStatus } from '..';

export class UseCaseUnableProcessInputResult implements UseCaseResult {
  public readonly terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.UnableProcessInput;
  public readonly data;
  constructor(errorMessage: string, at?: string) {
    this.data = { errorMessage, at };
  }
}
