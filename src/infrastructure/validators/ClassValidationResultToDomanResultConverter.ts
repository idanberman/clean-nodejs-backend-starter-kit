import { ValidationError } from 'class-validator';
import {
  FieldErrorDescription,
  ValidationSuccessResult,
  ValidationFailedResult,
} from 'src/domain/value-objects';
import { ValidationResult } from 'src/domain/value-objects';
export class ClassValidationResultToDomanResultConverter {
  public convert(
    classValidatorValidationErrors: ValidationError[],
  ): ValidationResult {
    if (classValidatorValidationErrors.length === 0) {
      return ValidationSuccessResult.create();
    }

    return ValidationFailedResult.create(
      classValidatorValidationErrors.map(
        this.convertValidationErrorToFieldErrorDescription,
      ),
    );
  }

  public convertValidationErrorToFieldErrorDescription(
    classValidatorValidationError: ValidationError,
  ): FieldErrorDescription {
    return new FieldErrorDescription(
      classValidatorValidationError.property,
      Object.values(classValidatorValidationError),
    );
  }
}
