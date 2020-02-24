import { InputSyntaxError } from 'src/domain/errors/operation';
import { injectable, inject } from 'inversify';
import { AppType } from 'src/app/AppType';
import { UseCaseInput } from '../input';
import { InputService, InputReadingResult } from 'src/app/services/input';

type inputRead = (
  input: UseCaseInput,
  inputService: InputService,
) => InputReadingResult;
export interface UseCaseInputReader {
  read(input: UseCaseInput, readInputRegister: inputRead[]): any[];
}
