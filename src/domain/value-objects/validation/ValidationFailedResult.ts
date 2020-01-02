import { BaseValidationResult } from './BaseValidationResult';
import { FieldErrorDescription } from '..';

export class ValidationFailedResult<T> extends BaseValidationResult<T> {
  constructor(
    public readonly fieldErrorDescription: FieldErrorDescription[],
    public readonly objectToValidate: T,
  ) {
    super(false, objectToValidate);
  }
}
