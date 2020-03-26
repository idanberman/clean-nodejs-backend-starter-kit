import { InputSyntaxError } from 'src/domain/kernel/errors/operation';
import { injectable, inject } from 'inversify';
import { AppType } from 'src/app/AppType';
import { MultiInputReader } from './MultiInputReader';
import { UseCaseInput } from 'src/domain/kernel/use-case';
import {
  IoFormattingService,
  IoFormattingResult,
} from '../io-formatting-service';

type inputRead = (
  input: UseCaseInput,
  formattingService: IoFormattingService,
) => IoFormattingResult;
@injectable()
export class MultiInputReaderImpl implements MultiInputReader {
  constructor(
    @inject(AppType.IoFormattingService)
    private readonly formattingService: IoFormattingService,
  ) {}
  // readInput(input: UseCaseInput, inputReadCallback: inputRead) :T{
  //   const inputRead();
  // }

  public read(input: UseCaseInput, readInputRegister: inputRead[]): any[] {
    const results = readInputRegister.map(inputReadCallback =>
      inputReadCallback(input, this.formattingService),
    );
    return this.treatResults(results);
  }
  private treatResults(results: IoFormattingResult[]): any[] {
    const failedResults = results.filter(result => !result.isSucceed());
    if (failedResults.length === 0) {
      return results.map(result => result.getValue());
    } else {
      throw new InputSyntaxError(
        failedResults.map(result => result.fieldSyntaxErrors).flat(),
      );
    }
  }
}
