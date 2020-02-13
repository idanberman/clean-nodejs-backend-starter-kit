import { UseCaseResult } from './UseCaseResult';
import { UseCaseTerminationStatus } from '../definitions';

export class UseCaseSucceedResult implements UseCaseResult {
  public readonly terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.Succeed;
  constructor(public readonly data?: any, public readonly metaData?: any) {}
}
