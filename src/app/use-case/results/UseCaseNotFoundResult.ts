import { UseCaseResult } from '../UseCaseResult';
import { UseCaseTerminationStatus } from '..';

export class UseCaseNotFoundResult implements UseCaseResult {
  public readonly terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.NotFound;
  public readonly data;
  constructor(errorMessage: string, at?: string) {
    this.data = { errorMessage, at };
  }
}
