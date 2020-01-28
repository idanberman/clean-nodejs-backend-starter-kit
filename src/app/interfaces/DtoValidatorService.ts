import { BaseDto } from 'src/domain/interfaces';
import { ValidationResult } from 'src/domain/value-objects';
import { ValidationMode } from '../../domain/value-objects/validation';

export interface DtoValidatorService {
  validate<T extends BaseDto>(
    objectToValidate: T,
    options?: {
      validationMode?: ValidationMode;
    },
  ): Promise<ValidationResult>;
}
