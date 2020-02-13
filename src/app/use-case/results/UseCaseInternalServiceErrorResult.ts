import { UseCaseResult } from './UseCaseResult';
import { UseCaseTerminationStatus } from '../definitions';
import { OperationFailedCausedBySystem } from 'src/domain/errors';

export class UseCaseInternalServiceErrorResult implements UseCaseResult {
  public readonly terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.InternalError;
  public readonly devNotes?: {
    causedBy: OperationFailedCausedBySystem;
    componentId?: string;
    actionId?: string;
    parameters?: object;
  };
  constructor(
    causedBy: OperationFailedCausedBySystem,
    componentId?: string,
    actionId?: string,
    parameters?: object,
  ) {
    this.devNotes = { causedBy, componentId, actionId, parameters };
  }
}
