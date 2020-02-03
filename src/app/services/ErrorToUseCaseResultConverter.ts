import { UseCaseResult } from 'src/app/use-case/UseCaseResult';

import { UseCaseInputSyntaxErrorResult } from 'src/app/use-case/results/UseCaseInputSyntaxErrorResult';
import { UseCaseInternalServiceErrorResult } from 'src/app/use-case/results/UseCaseInternalServiceErrorResult';
import { InputSyntaxError } from 'src/domain/errors/operation/by-user/InputSyntaxError';
import { OperationFailedCausedByResource } from 'src/domain/errors';

export class ErrorToUseCaseResultConverter {
  public convert(error: Error): UseCaseResult {
    if (error instanceof InputSyntaxError) {
      const syntaxError: InputSyntaxError = error as InputSyntaxError;
      return new UseCaseInputSyntaxErrorResult(syntaxError.errors);
    } else {
      // Unknown error
      throw error;
    }
  }
}
