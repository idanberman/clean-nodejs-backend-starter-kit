import { BaseDto } from 'src/domain/definitions';
import { InputReadingResult, InputReadingMode } from '.';

export interface InputService {
  validInputFromFreeObject<T extends BaseDto>(
    toClassType: T,
    fromValue: any,
    options?: {
      inputReadingMode?: InputReadingMode;
      inputSection?: string;
    },
  ): InputReadingResult;
}
