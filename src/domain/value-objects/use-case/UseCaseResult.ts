import { UseCaseTerminationStatus } from './UseCaseTerminationStatus';

export interface UseCaseResult {
  readonly terminationStatus: UseCaseTerminationStatus;
  readonly data?: any;
  readonly metaData?: any;
}
