export interface DomainError {
  readonly domainErrorType:
    | 'OperationFailedCausedByUser'
    | 'OperationFailedCausedBySystem';
}
