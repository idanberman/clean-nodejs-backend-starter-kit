import BaseDto from 'src/domain/interfaces/BaseDto';
import { ValidationResult } from 'src/domain/value-objects';

export interface BaseValidator<T extends BaseDto> {
  validate(objectToValidate: T): ValidationResult<T>;
}
