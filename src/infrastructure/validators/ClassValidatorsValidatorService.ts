import { BaseDto } from 'src/domain/interfaces/';
import { injectable, inject } from 'inversify';
import { ValidationResult } from 'src/domain/value-objects';
import { validate, ValidationError } from 'class-validator';
import { ClassValidationResultToDomanResultConverter } from './ClassValidationResultToDomanResultConverter';
import { ValidationMode } from 'src/domain/value-objects/validation';
import { DtoValidatorService } from 'src/app/interfaces';

@injectable()
export class ClassValidatorsValidatorService implements DtoValidatorService {
  private readonly classValidationResultToDomanResultConverter: ClassValidationResultToDomanResultConverter;
  constructor() {
    this.classValidationResultToDomanResultConverter = new ClassValidationResultToDomanResultConverter();
  }

  async validate<T extends BaseDto>(
    objectToValidate: T,
    options?: {
      validationMode?: ValidationMode;
    },
  ): Promise<ValidationResult> {
    const classValidationResult = await validate(objectToValidate, {
      whitelist: true,
      groups: [options.validationMode],
    });

    return Promise.resolve(
      this.classValidationResultToDomanResultConverter.convert(
        classValidationResult,
      ),
    );
  }

  convertRawValidationResultToDomainValidation;
}
