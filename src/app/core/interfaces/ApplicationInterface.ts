import { UseCaseContext, SecurityContext } from '../../use-case/context';
import { AppConfiguration } from 'src/domain/value-objects/configuration';
import { UseCaseInput } from '../../use-case/input';
import { UseCase, UseCaseResultPresenter } from '../../use-case/definitions';

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
