import { DomainError } from '../DomainError';

export interface OperationFailedCausedByResource extends DomainError {
  readonly type: 'OperationFailedCausedByResource';
  readonly componentId: string;
  readonly actionId: string;
  readonly causedBy: Error;
  readonly parameters: object;
}
