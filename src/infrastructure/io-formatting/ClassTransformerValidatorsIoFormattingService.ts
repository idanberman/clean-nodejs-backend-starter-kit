import { injectable, inject } from 'inversify';
import {
  transformAndValidateSync,
  ClassType,
} from 'class-transformer-validator';
import { ClassValidationErrorToDomainResultConverter } from './ClassValidationErrorToDomainResultConverter';
import {
  IoFormattingMode,
  IoFormattingResult,
  IoFormattingService,
} from 'src/app/services/io-formatting-service';
import { HasFormattingSchema } from 'src/domain/kernel/building-blocks/types';

@injectable()
export class ClassTransformerValidatorsIoFormattingService
  implements IoFormattingService {
  private readonly classValidationErrorToDomainResultConverter: ClassValidationErrorToDomainResultConverter;
  constructor() {
    this.classValidationErrorToDomainResultConverter = new ClassValidationErrorToDomainResultConverter();
  }

  public formatObject<T extends HasFormattingSchema>(
    targetFormat: T,
    fromValue: any,
    options: {
      ioFormattingMode: IoFormattingMode;
      inputSection?: string;
    },
  ): IoFormattingResult {
    try {
      const groups = [options && options.ioFormattingMode];
      const rawResult = transformAndValidateSync(
        (targetFormat.constructor as typeof HasFormattingSchema).getInputSyntaxSchema() as ClassType<
          T
        >,
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
      return IoFormattingResult.createSucceed(rawResult);
    } catch (errors) {
      return this.classValidationErrorToDomainResultConverter.convert(
        errors,
        options.inputSection,
      );
    }
  }
}
