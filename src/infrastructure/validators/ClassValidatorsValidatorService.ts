import { BaseValidator } from 'src/domain/interfaces/BaseValidator';
import BaseDto from 'src/domain/interfaces/BaseDto';
import { injectable, inject } from 'inversify';
import { ValidationResult } from 'src/domain/value-objects';

@injectable()
export class ClassValidatorsValidatorService<T extends BaseDto>
  implements BaseValidator<T> {
  validate<T extends BaseDto>(objectToValidate: T): ValidationResult<T> {
    throw new Error('Method not implemented.');
  }
}
