import { InputSyntaxError } from 'src/domain/errors/operation';
import { injectable, inject } from 'inversify';
import { AppType } from 'src/app/AppType';
import { UseCaseInput } from '../input';
import { InputService, InputReadingResult } from 'src/app/services/input';

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
    return this.treatResults(results);
  }
  private treatResults(results: InputReadingResult[]): any[] {
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
