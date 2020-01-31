import { FieldErrorDescription } from '../../value-objects/validation/FieldErrorDescription';
import { DomainError } from '../DomainError';

export class BadInputError implements DomainError {
  public readonly type = 'BadInputError';
  constructor(public readonly fields?: FieldErrorDescription[]) {}
}
