import { UseCaseResult } from '../UseCaseResult';
import { UseCaseTerminationStatus } from '..';
import { UseCaseInternalServiceErrorResult } from './UseCaseInternalServiceErrorResult';

export class UseCaseUnknownInternalServiceErrorResult
  extends UseCaseInternalServiceErrorResult
  implements UseCaseResult {
  public readonly terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.InternalError;
  public readonly data?: any;
  public readonly metaData?: any;
  public readonly devNotes?: {
    causedBy: Error;
    componentId?: string;
    actionId?: string;
    parameters?: object;
  };
  constructor(error: Error, parameters?: object) {
    super(error, 'Unknown Component', undefined, parameters);
  }
}
