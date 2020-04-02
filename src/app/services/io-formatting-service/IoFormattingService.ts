import { IoFormattingResult, IoFormattingMode } from '.';
import { HasFormattingSchema } from 'src/domain/kernel/building-blocks';

export interface IoFormattingService {
  formatObject<T extends HasFormattingSchema>(
    targetFormat: T,
    fromValue: any,
    options?: {
      ioFormattingMode: IoFormattingMode;
      inputSection?: string;
    },
  ): IoFormattingResult;
}
