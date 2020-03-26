import { DomainError } from '../DomainError';
import { FailureCode } from './by-user/values/FailureCode';

export interface OperationFailedCausedByUser extends DomainError {
  readonly domainErrorType: 'OperationFailedCausedByUser';
  readonly at: string;
  readonly rule: FailureCode;
}
