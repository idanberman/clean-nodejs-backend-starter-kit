import { UseCaseInput } from 'src/app/use-case/input';
import { SecurityContext, UseCaseContext } from 'src/app/use-case/context';
import { AppConfiguration } from 'src/domain/value-objects/configuration';
import { UseCase, UseCaseResultPresenter } from 'src/app/use-case/definitions';

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
