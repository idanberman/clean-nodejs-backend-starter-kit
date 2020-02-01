import { UseCaseResult } from '../UseCaseResult';
import { UseCaseTerminationStatus } from '..';

export class UseCaseInternalServiceErrorResult implements UseCaseResult {
  public readonly terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.InternalError;
  readonly devNotes?: {
    causedBy: Error;
    componentId?: string;
    actionId?: string;
    parameters?: object;
  };
  constructor(
    causedBy: Error,
    componentId?: string,
    actionId?: string,
    parameters?: object,
  ) {
    this.devNotes = { causedBy, componentId, actionId, parameters };
  }
}
