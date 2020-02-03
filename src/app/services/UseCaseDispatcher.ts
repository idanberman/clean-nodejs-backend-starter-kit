import { UseCase, UseCaseTerminationStatus } from 'src/app/use-case';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import { UseCaseContext } from '../context/UseCaseContext';
import { BaseDto } from 'src/domain/interfaces';
import { UseCaseResultPresenter } from '../interfaces/UseCaseResultPresenter';
import { InternalServiceError } from 'src/domain/errors';
import { UseCaseInternalServiceErrorResult } from '../use-case/results/UseCaseInternalServiceErrorResult';

export class UseCaseDispatcher {
  public async dispatch(
    useCase: UseCase,
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult> {
    let resultToPresent: UseCaseResult;
    try {
      resultToPresent = await useCase.run(context);

      if (
        resultToPresent.terminationStatus !== UseCaseTerminationStatus.Succeed
      ) {
        this.useCaseFailedHandler(resultToPresent);
      }
      resultToPresent = resultToPresent;
      return resultToPresent;
    } catch (error) {
      resultToPresent = this.generateUseCaseResultForUnhandledError(error);
      this.handleUnhandledError(error);
    } finally {
      if (useCase.dispose) {
        useCase.dispose();
      }
      presenter.present(resultToPresent);
    }
  }
  private handleUnhandledError(error: Error) {
    // tslint:disable-next-line: no-console
    console.error('Unhandled Error happened', error);
  }

  private useCaseFailedHandler(result: UseCaseResult): void {
    // tslint:disable-next-line: no-console
    console.log('UseCaseResultFailed', result);
  }
  private generateUseCaseResultForUnhandledError(
    error: Error,
  ): UseCaseInternalServiceErrorResult {
    return new UseCaseInternalServiceErrorResult(
      new InternalServiceError('Unhandled Error', error),
    );
  }
}
