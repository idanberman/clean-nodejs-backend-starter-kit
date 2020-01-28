import { UseCaseResult } from '../UseCaseResult';
import { UseCaseTerminationStatus } from '../UseCaseTerminationStatus';

export class UseCaseSucceedResult implements UseCaseResult {
  readonly terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.Succeed;
  constructor(public readonly data?: any, public readonly metaData?: any) {}
}
