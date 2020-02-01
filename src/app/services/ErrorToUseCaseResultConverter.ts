import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import {
  BadInputError,
  ResourceFailedError,
  InternalServiceError,
} from 'src/domain/errors';
import { UseCaseInputSyntaxErrorResult } from 'src/app/use-case/results/UseCaseInputSyntaxErrorResult';
import { UseCaseInternalServiceErrorResult } from 'src/app/use-case/results/UseCaseInternalServiceErrorResult';

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
      return new UseCaseInternalServiceErrorResult(
        causedBy,
        componentId,
        actionId,
        parameters,
      );
    } else if (error instanceof Error) {
      return new UseCaseInternalServiceErrorResult(
        error,
        'Unhandled unknown component error',
      );
    }

    throw new Error('Unhandled exception with unknown error object');
  }
}
