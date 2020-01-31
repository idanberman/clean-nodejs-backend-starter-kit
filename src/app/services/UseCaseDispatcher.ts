import { UseCase } from 'src/app/use-case';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import { UseCaseContext } from '../context/UseCaseContext';
import { BaseDto } from 'src/domain/interfaces';
import { UseCaseResultPresenter } from '../interfaces/UseCaseResultPresenter';
import { InternalServiceError } from 'src/domain/errors';
import { UseCaseInternalServiceError } from '../use-case/results/UseCaseInternalServiceError';

export class UseCaseDispatcher {
  async dispatch(
    useCase: UseCase,
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult> {
    try {
      return await useCase.run(context, presenter);
    } catch (error) {
      console.log('Error', error);

      presenter.present(new UseCaseInternalServiceError(error));
    } finally {
      if (useCase.dispose) {
        useCase.dispose();
      }
    }
  }
}
