import { BaseDto } from 'src/domain/interfaces';
import { InputReceivingMode, InputReceivingResult } from '.';

export interface InputService {
  receiveInputFromObject<T extends BaseDto>(
    toClassType: T,
    fromValue: any,
    options?: {
      inputReceivingMode?: InputReceivingMode;
    },
  ): InputReceivingResult;
}
