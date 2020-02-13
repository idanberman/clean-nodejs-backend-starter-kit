import { UseCaseTerminationStatus } from '../definitions/UseCaseTerminationStatus';
import { OperationFailedCausedBySystem } from 'src/domain/errors';

export interface UseCaseResult {
  readonly terminationStatus: UseCaseTerminationStatus;
  readonly data?: any;
  readonly metaData?: any;
  readonly devNotes?: {
    causedBy: OperationFailedCausedBySystem;
    componentId?: string;
    actionId?: string;
    parameters?: object;
  };
}
