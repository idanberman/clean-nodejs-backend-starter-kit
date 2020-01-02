import { BaseValidationResult } from './BaseValidationResult';

export class ValidationSuccessResult<T> extends BaseValidationResult<T> {
  constructor(
    public readonly objectToValidate: T,
    public readonly sanitizedObject: T,
  ) {
    super(true, objectToValidate);
  }
}
