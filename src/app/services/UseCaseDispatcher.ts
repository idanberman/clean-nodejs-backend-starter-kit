import { UseCase, UseCaseTerminationStatus } from 'src/app/use-case';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import { UseCaseContext } from '../context/UseCaseContext';
import { BaseDto } from 'src/domain/interfaces';
import { UseCaseResultPresenter } from '../interfaces/UseCaseResultPresenter';
import { InternalServiceError } from 'src/domain/errors';
import { UseCaseInternalServiceErrorResult } from '../use-case/results/UseCaseInternalServiceErrorResult';

export class UseCaseDispatcher {
  private handleError(result: UseCaseResult): void {
    // tslint:disable-next-line: no-console
    console.log('UseCaseResultFailed', result);
  }
  async dispatch(
    useCase: UseCase,
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult> {
    try {
      const result: UseCaseResult = await useCase.run(context, presenter);

      if (result.terminationStatus !== UseCaseTerminationStatus.Succeed) {
        this.handleError(result);
      }

      return result;
    } catch (error) {
      const internalUseCaseInternalServiceErrorResult = new UseCaseInternalServiceErrorResult(
        new InternalServiceError('Unhandled Error', error),
      );
      presenter.present(internalUseCaseInternalServiceErrorResult);
      this.handleError(internalUseCaseInternalServiceErrorResult);
    } finally {
      if (useCase.dispose) {
        useCase.dispose();
      }
    }
  }
}
