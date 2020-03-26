import { OperationFailedCausedByUser } from '../OperationFailedCausedByUser';
import { FailureCode } from './values/FailureCode';

export class WriteResourceNotFoundError implements OperationFailedCausedByUser {
  public readonly domainErrorType: 'OperationFailedCausedByUser';
  public readonly at: string;
  public readonly rule: FailureCode = FailureCode.WriteResourceNotFound;
  constructor(identifiedPropertyName: string, identifiedPropertyValue: string) {
    this.at = `${identifiedPropertyName}='${identifiedPropertyValue}'`;
  }
}
