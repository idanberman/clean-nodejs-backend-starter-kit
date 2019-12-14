import { ValidatorService } from 'src/domain/services/ValidatorService';
import Dto from 'src/domain/dto/Dto.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassValidatorsValidatorService implements ValidatorService {
  validate<T extends Dto>(objectToValidate: T): ValidationResult {
    throw new Error('Method not implemented.');
  }
}
