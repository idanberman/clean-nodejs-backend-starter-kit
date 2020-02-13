import {
  WriteResourceNotFoundError,
  ReadResourceNotFoundError,
  InvalidInputError,
  InputSyntaxError,
} from 'src/domain/errors/operation';
import { DomainError } from 'src/domain/errors';
import {
  UseCaseResult,
  UseCaseInputSyntaxErrorResult,
  UseCaseUnableProcessInputResult,
  UseCaseNotFoundResult,
} from '../results';

export class DomainErrorToUseCaseResultConverter {
  private isDomainErrorType(
    toBeDetermined: any,
  ): toBeDetermined is DomainError {
    return toBeDetermined.domainErrorType;
  }
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

    if (error instanceof InvalidInputError) {
      return new UseCaseUnableProcessInputResult(error.errorMessage, error.at);
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
