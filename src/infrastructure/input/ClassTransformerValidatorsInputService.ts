import { BaseDto } from 'src/domain/interfaces/';
import { injectable, inject } from 'inversify';
import {
  transformAndValidateSync,
  ClassType,
} from 'class-transformer-validator';
import { ClassValidationErrorToDomainResultConverter } from './ClassValidationErrorToDomainResultConverter';
import {
  InputReceivingMode,
  InputReceivingResult,
  InputReceivingSuccessResult,
  InputService,
} from 'src/app/services/input';

@injectable()
export class ClassTransformerValidatorsInputService implements InputService {
  private readonly classValidationErrorToDomainResultConverter: ClassValidationErrorToDomainResultConverter;
  constructor() {
    this.classValidationErrorToDomainResultConverter = new ClassValidationErrorToDomainResultConverter();
  }

  public receiveInputFromObject<T extends BaseDto>(
    toClassType: T,
    fromValue: any,
    options?: {
      inputReceivingMode?: InputReceivingMode;
    },
  ): InputReceivingResult {
    const validOptions = options || {};
    try {
      return InputReceivingSuccessResult.create(
        transformAndValidateSync(
          (toClassType as unknown) as ClassType<T>,
          fromValue as object,
          {
            validator: {
              whitelist: true,
              groups: [validOptions && validOptions.inputReceivingMode],
              forbidUnknownValues: true,
            },
          },
        ),
      );
    } catch (errors) {
      return this.classValidationErrorToDomainResultConverter.convert(errors);
    }
  }
}
