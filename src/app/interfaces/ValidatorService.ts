import BaseDto from 'src/domain/dto/BaseDto';
import { ValidationResult } from 'src/domain/value-objects';

export interface ValidatorService<T extends BaseDto> {
  validate(objectToValidate: T): ValidationResult;
}
