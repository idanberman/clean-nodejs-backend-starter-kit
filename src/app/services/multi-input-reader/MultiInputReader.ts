import {
  IoFormattingService,
  IoFormattingResult,
} from 'src/app/services/io-formatting-service';
import { UseCaseInput } from 'src/domain/kernel/use-case';

type inputRead = (
  input: UseCaseInput,
  ioFormattingService: IoFormattingService,
) => IoFormattingResult;
export interface MultiInputReader {
  read(input: UseCaseInput, readInputRegister: inputRead[]): any[];
}
