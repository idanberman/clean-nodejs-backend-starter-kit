import { UseCaseResult } from 'src/app/use-case/results/UseCaseResult';
import { UseCaseContext } from '../use-case/context';
import {
  UseCaseResultPresenter,
  UseCase,
  UseCaseTerminationStatus,
} from '../use-case/definitions';
import { DomainErrorToUseCaseResultMapper } from '../use-case/services';
import { UnknownSystemFailure } from 'src/domain/errors/operation';

export class UseCaseDispatcherService {
  private readonly domainErrorMapper: DomainErrorToUseCaseResultMapper = new DomainErrorToUseCaseResultMapper();

  public async dispatch(
    useCase: UseCase,
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<void> {
    let result: UseCaseResult;
    try {
      result = await this.runUseCase(useCase, context);

      if (result.terminationStatus !== UseCaseTerminationStatus.Succeed) {
        this.applicationGlobalErrorHandler(result);
      }
    } catch (error) {
      result = this.domainErrorMapper.map(error);
      this.applicationGlobalErrorHandler(result);
    }
    presenter.present(result);
  }

  private async runUseCase(
    useCase: UseCase,
    context: UseCaseContext,
  ): Promise<UseCaseResult> {
    try {
      return await useCase.run(context);
    } finally {
      if (useCase.dispose) {
        useCase.dispose();
      }
    }
  }

  private handleUnknownError(error: Error) {
    // tslint:disable-next-line: no-console
    console.error('Unknown Error happened', error);
  }

  private applicationGlobalErrorHandler(result: UseCaseResult): void {
    if (
      result.terminationStatus === UseCaseTerminationStatus.InternalError &&
      result.metaData?.caughtUnknownError instanceof UnknownSystemFailure
    ) {
      this.handleUnknownError(result.metaData.caughtUnknownError);
    } else if (
      result.terminationStatus === UseCaseTerminationStatus.InternalError
    ) {
      // tslint:disable-next-line: no-console
      console.log('Use case failed by the system', result);
    }
  }
}
