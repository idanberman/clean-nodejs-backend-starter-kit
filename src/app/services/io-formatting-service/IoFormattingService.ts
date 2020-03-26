import { IoFormattingResult, IoFormattingMode } from '.';
import { HasInputSyntaxSchema } from 'src/domain/kernel/building-blocks';

export interface IoFormattingService {
  formatObject<T extends HasInputSyntaxSchema>(
    targetFormat: T,
    fromValue: any,
    options?: {
      ioFormattingMode: IoFormattingMode;
      inputSection?: string;
    },
  ): IoFormattingResult;
}
