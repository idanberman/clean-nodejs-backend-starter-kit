import { UseCaseInputSyntaxErrorResult } from 'src/app/use-case/results/UseCaseInputSyntaxErrorResult';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import { WriteResourceNotFound } from 'src/domain/errors/operation';
import { InputSyntaxError } from 'src/domain/errors/operation/by-user/InputSyntaxError';
import { UseCaseTerminationStatus } from '../use-case';
import { UseCaseUnableProcessInputResult } from '../use-case/results/UseCaseUnableProcessInputResult';
import { DomainError } from 'src/domain/errors/DomainError';

export class DomainErrorToUseCaseResultConverter {
  private isDomainErrorType(
    toBeDetermined: any,
  ): toBeDetermined is DomainError {
    return toBeDetermined.terminationStatus;
  }
  private throwTypeError() {
    throw new TypeError('Can not convert error to result');
  }
  public convert(error: DomainError): UseCaseResult {
    // instanceof UseCaseResult
    if (!this.isDomainErrorType(error)) {
      this.throwTypeError();
    }

    if (error instanceof InputSyntaxError) {
      const syntaxError: InputSyntaxError = error as InputSyntaxError;
      return new UseCaseInputSyntaxErrorResult(syntaxError.errors);
    }

    if (error instanceof WriteResourceNotFound) {
      return new UseCaseUnableProcessInputResult(
        'Can not find entity by provided parameters',
      );
    }
    this.throwTypeError();
  }
}
