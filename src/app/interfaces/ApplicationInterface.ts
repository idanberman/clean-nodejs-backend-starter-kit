import { UseCaseInput, UseCase } from '../use-case';
import { UseCaseContext } from '../context/UseCaseContext';
import { SecurityContext } from '../context/SecurityContext';
import { AppConfiguration } from 'src/domain/value-objects/configuration';
import { DomainRepository } from 'src/domain/interfaces';
import { RepositoryId } from 'src/domain/RepositoryId';
import { UseCaseResultPresenter } from '.';

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
