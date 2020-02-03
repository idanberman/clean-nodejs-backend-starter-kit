import { DomainError } from '../DomainError';
import { FailureCode } from './by-user/values/FailureCode';

export interface OperationFailedCausedByUser extends DomainError {
  readonly type: 'OperationFailedCausedByUser';
  readonly at: string;
  readonly rule: FailureCode;
}
