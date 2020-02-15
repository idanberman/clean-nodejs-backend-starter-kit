import { injectable, inject } from 'inversify';
import {
  transformAndValidateSync,
  ClassType,
} from 'class-transformer-validator';
import { ClassValidationErrorToDomainResultConverter } from './ClassValidationErrorToDomainResultConverter';
import {
  InputReadingMode,
  InputReadingResult,
  InputService,
} from 'src/app/services/input';
import { BaseDto } from 'src/domain/definitions';

@injectable()
export class ClassTransformerValidatorsInputService implements InputService {
  private readonly classValidationErrorToDomainResultConverter: ClassValidationErrorToDomainResultConverter;
  constructor() {
    this.classValidationErrorToDomainResultConverter = new ClassValidationErrorToDomainResultConverter();
  }

  public validInputFromFreeObject<T extends BaseDto>(
    toClassType: T,
    fromValue: any,
    options?: {
      inputReadingMode?: InputReadingMode;
      inputSection?: string;
    },
  ): InputReadingResult {
    const validOptions = options || {};
    try {
      const groups = [validOptions && validOptions.inputReadingMode];
      const rawResult = transformAndValidateSync(
        (toClassType as unknown) as ClassType<T>,
        fromValue as object,
        {
          validator: {
            whitelist: true,
            groups,
            forbidUnknownValues: true,
          },
          transformer: {
            groups,
          },
        },
      );
      return InputReadingResult.createSucceed(rawResult);
    } catch (errors) {
      return this.classValidationErrorToDomainResultConverter.convert(
        errors,
        validOptions.inputSection,
      );
    }
  }
}
