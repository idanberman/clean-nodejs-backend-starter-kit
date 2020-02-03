import { OperationFailedCausedByUser } from '../OperationFailedCausedByUser';
import { FailureCode } from './values/FailureCode';

export class WriteResourceNotFound implements OperationFailedCausedByUser {
  public readonly type: 'OperationFailedCausedByUser';
  public readonly at: string;
  public readonly rule: FailureCode = FailureCode.WriteResourceNotFound;
  constructor(identifiedPropertyName: string, identifiedPropertyValue: string) {
    this.at = `${identifiedPropertyName}='${identifiedPropertyValue}'`;
  }
}
