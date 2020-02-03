import { UseCaseResult } from 'src/app/use-case/UseCaseResult';

import { UseCaseInputSyntaxErrorResult } from 'src/app/use-case/results/UseCaseInputSyntaxErrorResult';
import { UseCaseInternalServiceErrorResult } from 'src/app/use-case/results/UseCaseInternalServiceErrorResult';
import { InputSyntaxError } from 'src/domain/errors/operation/by-user/InputSyntaxError';
import { OperationFailedCausedByResource } from 'src/domain/errors';

export class ErrorToUseCaseResultConverter {
  convert(error: Error): UseCaseResult {
    if (error instanceof InputSyntaxError) {
      const syntaxError: InputSyntaxError = error as InputSyntaxError;
      return new UseCaseInputSyntaxErrorResult(syntaxError.errors);
    } else {
      return new UseCaseInternalServiceErrorResult(
        error,
        'Unhandled unknown component error',
      );
    }

    throw new Error('Unhandled exception with unknown error object');
  }
}
