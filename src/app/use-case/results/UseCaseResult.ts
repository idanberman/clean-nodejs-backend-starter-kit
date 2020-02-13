import { UseCaseTerminationStatus } from '../definitions/UseCaseTerminationStatus';

export interface UseCaseResult {
  readonly terminationStatus: UseCaseTerminationStatus;
  readonly data?: any;
  readonly metaData?: any;
  readonly devNotes?: {
    causedBy: Error;
    componentId?: string;
    actionId?: string;
    parameters?: object;
  };
}
