import { FieldErrorDescription } from './FieldErrorDescription';
import { ValidationResult } from './ValidationResult';

export class ValidationFailedResult implements ValidationResult {
  private constructor(
    public readonly fieldErrorsDescription: FieldErrorDescription[],
  ) {}

  isSucceed(): boolean {
    return false;
  }

  static create(
    fieldErrorsDescription: FieldErrorDescription[],
  ): ValidationFailedResult {
    return new ValidationFailedResult(fieldErrorsDescription);
  }
}
