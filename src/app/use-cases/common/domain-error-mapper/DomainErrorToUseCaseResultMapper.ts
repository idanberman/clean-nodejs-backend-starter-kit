import {
  WriteResourceNotFoundError,
  ReadResourceNotFoundError,
  InvalidInputError,
  InputSyntaxError,
  DomainErrorToUseCaseResultMappingError,
} from 'src/domain/kernel/errors/operation';
import { DomainError } from 'src/domain/kernel/errors';
import { UseCaseResult } from 'src/domain/kernel/use-case';

export class DomainErrorToUseCaseResultMapper {
  private isDomainErrorType(
    toBeDetermined: any,
  ): toBeDetermined is DomainError {
    return toBeDetermined.domainErrorType;
  }

  private doMap(error: DomainError | Error): UseCaseResult {
    if (error instanceof InputSyntaxError) {
      const syntaxError: InputSyntaxError = error as InputSyntaxError;
      return UseCaseResult.syntaxError(syntaxError.errors);
    }

    if (error instanceof WriteResourceNotFoundError) {
      return UseCaseResult.unableProcessInput(
        'Can not find entity by provided parameters',
        error.at,
      );
    }

    if (error instanceof ReadResourceNotFoundError) {
      return UseCaseResult.requestedDataNotFound(
        'Can not find requested resource',
        error.at,
      );
    }

    if (error instanceof InvalidInputError) {
      return UseCaseResult.unableProcessInput(error.errorMessage, error.at);
    }

    if (this.isDomainErrorType(error)) {
      return UseCaseResult.fromDomainError(error);
    }

    if (error instanceof Error) {
      return UseCaseResult.fromUnknownError(error);
    }
    return UseCaseResult.fromUnknownError(
      new TypeError(`Unhandled domain error  (type of ${typeof error})`),
    );
  }
  public map(error: DomainError | Error): UseCaseResult {
    // This method mustn't throw an error. UseCaseResult must being return, so any presenter will react well.
    // Nothing designed to throw an Error, so if it has been thrown, It's error in the mapping process itself.
    try {
      return this.doMap(error);
    } catch (mappingError) {
      return UseCaseResult.fromDomainError(
        new DomainErrorToUseCaseResultMappingError(
          'DomainErrorToUseCaseResultMapper',
          'map',
          mappingError,
          error,
        ),
      );
    }
  }
}
