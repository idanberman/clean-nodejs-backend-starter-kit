import { ValidationError } from 'class-validator';
import { InputReadingResult } from 'src/app/services/input';
import { UseCaseInputErrorDescription } from 'src/domain/errors/operation/by-user/values/UseCaseInputErrorDescription';
export class ClassValidationErrorToDomainResultConverter {
  public convert(
    classValidatorInputReadingErrors: ValidationError[],
    section?: string,
  ): InputReadingResult {
    if (classValidatorInputReadingErrors.length === 0) {
      throw Error('No error to convert');
    }

    return InputReadingResult.createFailed(
      classValidatorInputReadingErrors.map(validationError =>
        this.convertValidationErrorToErrorDescription(validationError, section),
      ),
    );
  }

  private convertValidationErrorToErrorDescription(
    validationError: ValidationError,
    section?: string,
  ): UseCaseInputErrorDescription {
    return new UseCaseInputErrorDescription(
      Object.values(validationError.constraints),
      validationError.property,
      section,
    );
  }
}
