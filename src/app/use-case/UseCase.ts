import { UseCaseResultPresenter } from '../interfaces/UseCaseResultPresenter';
import { UseCaseContext } from '../context/UseCaseContext';
import { UseCaseResult } from './UseCaseResult';

export interface UseCase {
  run(
    useCaseContext: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult>;

  dispose();
}
