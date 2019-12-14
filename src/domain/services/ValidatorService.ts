import Dto from '../dto/Dto.interface';
import { ValidationResult } from '../value-objects';

export interface ValidatorService {
  validate<T extends Dto>(objectToValidate: T): ValidationResult;
}
