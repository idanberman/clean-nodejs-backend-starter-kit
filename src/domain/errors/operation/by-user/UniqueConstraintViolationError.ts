import { OperationFailedCausedByUser } from '../OperationFailedCausedByUser';
import { FailureCode } from './values/FailureCode';
import { AbstractInvalidArguments } from '..';

export abstract class UniqueConstraintViolationError
  // For plugin any repository implementation
  extends AbstractInvalidArguments
  implements OperationFailedCausedByUser {
  public readonly domainErrorType: 'OperationFailedCausedByUser';
  public readonly rule: FailureCode = FailureCode.UniqueConstraintViolation;
  public readonly at: string;
  public readonly fieldsName: string[];

  constructor(fieldsName: string[] | string) {
    super(Array.isArray(fieldsName) ? fieldsName.join(';') : fieldsName);
    this.fieldsName = Array.isArray(fieldsName) ? fieldsName : [fieldsName];
  }
}
