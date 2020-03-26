import { UseCaseResult } from 'src/domain/kernel/use-case/UseCaseResult';
import { UnknownSystemFailure } from 'src/domain/kernel/errors/operation';
import { DomainErrorToUseCaseResultMapper } from 'src/app/use-cases/common/domain-error-mapper';
import { UseCase } from 'src/domain/kernel/ddd';
import {
  UseCaseContext,
  UseCaseTerminationStatus,
} from 'src/domain/kernel/use-case';
import { UseCaseResultPresenter } from 'src/domain/interfaces';

export class UseCaseDispatcher {
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
