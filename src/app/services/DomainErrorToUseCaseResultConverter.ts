import { UseCaseInputSyntaxErrorResult } from 'src/app/use-case/results/UseCaseInputSyntaxErrorResult';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import {
  WriteResourceNotFoundError,
  ReadResourceNotFoundError,
} from 'src/domain/errors/operation';
import { InputSyntaxError } from 'src/domain/errors/operation/by-user/InputSyntaxError';
import { UseCaseTerminationStatus } from '../use-case';
import { UseCaseUnableProcessInputResult } from '../use-case/results/UseCaseUnableProcessInputResult';
import { DomainError } from 'src/domain/errors/DomainError';
import { UseCaseNotFoundResult } from '../use-case/results/UseCaseNotFoundResult';

export class DomainErrorToUseCaseResultConverter {
  private isDomainErrorType(
    toBeDetermined: any,
  ): toBeDetermined is DomainError {
    return toBeDetermined.domainErrorType;
  }
  private throwTypeError() {}
  public convert(error: DomainError): UseCaseResult {
    // instanceof UseCaseResult

    if (error instanceof InputSyntaxError) {
      const syntaxError: InputSyntaxError = error as InputSyntaxError;
      return new UseCaseInputSyntaxErrorResult(syntaxError.errors);
    }

    if (error instanceof WriteResourceNotFoundError) {
      return new UseCaseUnableProcessInputResult(
        'Can not find entity by provided parameters',
      );
    }

    if (error instanceof ReadResourceNotFoundError) {
      return new UseCaseNotFoundResult(
        'Can not find entity by provided parameters',
      );
    }

    console.log('Unhandled error type:', typeof error, ' Error:', error);
    if (!this.isDomainErrorType(error)) {
      throw new TypeError(
        `Error (type of ${typeof error}) is not a domain error, can not convert`,
      );
    }

    throw new TypeError(`Unhandled domain error  (type of ${typeof error})`);
  }
}
