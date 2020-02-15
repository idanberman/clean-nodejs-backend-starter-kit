import { UseCaseResult } from 'src/app/use-case/results/UseCaseResult';
import { UseCaseContext } from '../use-case/context';
import {
  UseCaseResultPresenter,
  UseCase,
  UseCaseTerminationStatus,
} from '../use-case/definitions';
import { DomainErrorToUseCaseResultConverter } from '../use-case/tools';

export class UseCaseDispatcherService {
  private readonly domainErrorConverter: DomainErrorToUseCaseResultConverter = new DomainErrorToUseCaseResultConverter();

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
      resultToPresent = this.getErrorResult(resultToPresent, error);
      this.handleUnhandledError(error);
    } finally {
      if (useCase.dispose) {
        useCase.dispose();
      }
      presenter.present(resultToPresent);
    }
  }

  private getErrorResult(resultToPresent: UseCaseResult, error: any) {
    try {
      resultToPresent = this.domainErrorConverter.convert(error);
    } catch (irrelevant) {
      resultToPresent = UseCaseResult.fromUnknownError(error);
    }
    return resultToPresent;
  }

  private handleUnhandledError(error: Error) {
    // tslint:disable-next-line: no-console
    console.error('Unhandled Error happened', error);
  }

  private useCaseFailedHandler(result: UseCaseResult): void {
    if (result.terminationStatus === UseCaseTerminationStatus.InternalError) {
      // tslint:disable-next-line: no-console
      console.log('UseCaseResultFailed', result);
    }
  }
}
