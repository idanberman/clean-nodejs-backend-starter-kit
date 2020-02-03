import { OperationFailedCausedByUser } from '..';
import { FailureCode } from './values/FailureCode';

export abstract class AbstractInvalidArguments
  implements OperationFailedCausedByUser {
  type: 'OperationFailedCausedByUser';
  abstract rule: FailureCode;
  protected constructor(public readonly at: string) {}
}
