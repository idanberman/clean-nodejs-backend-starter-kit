import {
  WriteResourceNotFoundError,
  ReadResourceNotFoundError,
  InvalidInputError,
  InputSyntaxError,
} from 'src/domain/errors/operation';
import { DomainError } from 'src/domain/errors';
import { UseCaseResult } from '../results';

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
      return UseCaseResult.syntaxError(syntaxError.errors);
    }

    if (error instanceof WriteResourceNotFoundError) {
      UseCaseResult.unableProcessInput(
        'Can not find entity by provided parameters',
        error.at,
      );
    }

    if (error instanceof ReadResourceNotFoundError) {
      UseCaseResult.requestedDataNotFound(
        'Can not find requested resource',
        error.at,
      );
    }

    if (error instanceof InvalidInputError) {
      return UseCaseResult.unableProcessInput(error.errorMessage, error.at);
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
