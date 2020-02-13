import { DomainError } from '../DomainError';

export interface OperationFailedCausedBySystem extends DomainError {
  readonly domainErrorType: 'OperationFailedCausedBySystem';
  readonly causedBy: Error;
  readonly componentId: string;
  readonly actionId: string;
  readonly parameters: object;
}
