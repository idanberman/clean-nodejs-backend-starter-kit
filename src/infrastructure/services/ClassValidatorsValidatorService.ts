import { ValidatorService } from 'src/app/interfaces/ValidatorService';
import BaseDto from 'src/domain/dto/BaseDto';
import { injectable, inject } from 'inversify';
import { ValidationResult } from 'src/domain/value-objects';

@injectable()
export class ClassValidatorsValidatorService<T extends BaseDto>
  implements ValidatorService<T> {
  validate<T extends BaseDto>(objectToValidate: T): ValidationResult {
    throw new Error('Method not implemented.');
  }
}
