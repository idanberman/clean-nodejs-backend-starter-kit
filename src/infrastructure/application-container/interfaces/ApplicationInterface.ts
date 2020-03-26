import { AppConfiguration } from 'src/domain/kernel/configuration';
import {
  UseCaseInput,
  SecurityContext,
  UseCaseContext,
} from 'src/domain/kernel/use-case';
import { UseCaseResultPresenter } from 'src/domain/interfaces';
import { UseCase } from 'src/domain/kernel/ddd';

export interface ApplicationInterface {
  createUseCaseContext(
    input: UseCaseInput,
    securityContext: SecurityContext,
  ): UseCaseContext;

  getConfiguration(): AppConfiguration;

  getUseCase(useCaseId): UseCase;
  injectMock<T>(injectionId, value: new (...args: any[]) => T);
  dispatchUseCase(
    useCase: UseCase,
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  );
}
