import { BaseDto } from 'src/domain/interfaces';
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
