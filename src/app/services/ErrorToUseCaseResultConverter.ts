import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import {
  BadInputError,
  ResourceFailedError,
  InternalServiceError,
} from 'src/domain/errors';
import { UseCaseInputSyntaxErrorResult } from 'src/app/use-case/results/UseCaseInputSyntaxErrorResult';
import { UseCaseInternalServiceError } from 'src/app/use-case/results/UseCaseInternalServiceError';

export class ErrorToUseCaseResultConverter {
  convert(error: Error): UseCaseResult {
    if (error instanceof BadInputError) {
      const badInputError: BadInputError = error as BadInputError;
      return new UseCaseInputSyntaxErrorResult(badInputError.fields);
    } else if (error instanceof ResourceFailedError) {
      const {
        causedBy,
        componentId,
        actionId,
        parameters,
      }: ResourceFailedError = error as ResourceFailedError;
      return new UseCaseInternalServiceError(
        causedBy,
        componentId,
        actionId,
        parameters,
      );
    } else if (error instanceof Error) {
      return new UseCaseInternalServiceError(
        error,
        'Unhandled unknown component error',
      );
    }

    throw new Error('Unhandled exception with unknown error object');
  }
}
