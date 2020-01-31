import { UseCase } from 'src/app/use-case';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import { UseCaseContext } from '../context/UseCaseContext';
import { BaseDto } from 'src/domain/interfaces';
import { UseCaseResultPresenter } from '../interfaces/UseCaseResultPresenter';

export class UseCaseDispatcher {
  async dispatch(
    useCase: UseCase,
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult> {
    try {
      return await useCase.run(context, presenter);
    } finally {
      if (useCase.dispose) {
        useCase.dispose();
      }
    }
  }
}
