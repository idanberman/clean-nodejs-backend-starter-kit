import { BaseDto } from 'src/domain/definitions';
import { InputReadingResult, InputReadingMode } from '.';

export interface InputService {
  validInputFromFreeShapeObject<T extends BaseDto>(
    toClassType: T,
    fromValue: any,
    options?: {
      inputReadingMode?: InputReadingMode;
      inputSection?: string;
    },
  ): InputReadingResult;
}
