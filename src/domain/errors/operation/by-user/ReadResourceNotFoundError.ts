import { OperationFailedCausedByUser } from '../OperationFailedCausedByUser';
import { FailureCode } from './values/FailureCode';

export class ReadResourceNotFoundError implements OperationFailedCausedByUser {
  type: 'OperationFailedCausedByUser';
  at: string;
  rule: FailureCode = FailureCode.ReadResourceNotFound;
  constructor(identifiedPropertyName: string, identifiedPropertyValue: string) {
    this.at = `${identifiedPropertyName}='${identifiedPropertyValue}'`;
  }
}
