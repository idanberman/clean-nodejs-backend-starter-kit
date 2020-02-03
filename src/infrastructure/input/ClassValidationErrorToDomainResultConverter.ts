import { ValidationError } from 'class-validator';
import {
  InputReceivingResult,
  InputReceivingFailedResult,
} from 'src/app/services/input';
import { ErrorDescription } from 'src/domain/errors/operation/by-user/values/ErrorDescription';
export class ClassValidationErrorToDomainResultConverter {
  public convert(
    classValidatorInputReceivingErrors: ValidationError[],
  ): InputReceivingResult {
    if (classValidatorInputReceivingErrors.length === 0) {
      throw Error('No error to convert');
    }

    return InputReceivingFailedResult.create(
      classValidatorInputReceivingErrors.map(
        this.convertValidationErrorToErrorDescription,
      ),
    );
  }

  private convertValidationErrorToErrorDescription(
    validationError: ValidationError,
  ): ErrorDescription {
    return new ErrorDescription(
      validationError.property,
      Object.values(validationError.constraints),
    );
  }
}
