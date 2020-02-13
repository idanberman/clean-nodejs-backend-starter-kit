import { UseCaseResult } from 'src/app/use-case/results';

export interface UseCaseResultPresenter {
  present(result: UseCaseResult): UseCaseResult;
}
