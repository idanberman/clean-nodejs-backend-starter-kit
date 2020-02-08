import { UseCaseInput } from 'src/app/use-case';
import { InputReadingResult } from './InputReadingResult';
import { InputSyntaxError } from 'src/domain/errors/operation/by-user/InputSyntaxError';
import { InputService } from '.';
import { injectable, inject } from 'inversify';
import { AppType } from 'src/app/AppType';

type inputRead = (
  input: UseCaseInput,
  inputService: InputService,
) => InputReadingResult;
@injectable()
export class UseCaseInputReader {
  constructor(
    @inject(AppType.InputService)
    private readonly inputService: InputService,
  ) {}
  // readInput(input: UseCaseInput, inputReadCallback: inputRead) :T{
  //   const inputRead();
  // }

  public read(input: UseCaseInput, readInputRegister: inputRead[]): any[] {
    const results = readInputRegister.map(inputReadCallback =>
      inputReadCallback(input, this.inputService),
    );
    const failedResults = results.filter(result => !result.isSucceed());
    // failedResults[0];
    if (failedResults.length === 0) {
      return results.map(result => result.getValue());
    } else {
      throw new InputSyntaxError(
        failedResults.map(result => result.fieldSyntaxErrors).flat(),
      );
    }
  }
}
