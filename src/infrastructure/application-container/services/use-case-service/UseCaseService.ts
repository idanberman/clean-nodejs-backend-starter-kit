import { UseCaseResult } from 'src/domain/kernel/use-case/UseCaseResult';
import { UnknownSystemFailure } from 'src/domain/kernel/errors/operation';
import { DomainErrorToUseCaseResultMapper } from 'src/app/use-cases/common/domain-error-mapper';
import { UseCase } from 'src/domain/kernel/ddd';
import {
  UseCaseContext,
  UseCaseTerminationStatus,
} from 'src/domain/kernel/use-case';
import { UseCaseResultPresenter } from 'src/domain/interfaces';

export interface UseCaseService {
  dispatchUseCase(
    useCase: UseCase,
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<void>;
}
