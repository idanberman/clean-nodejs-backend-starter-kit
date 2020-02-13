import { UseCaseResult } from 'src/app/use-case/results/UseCaseResult';

export interface UseCaseResultPresenter {
  present(result: UseCaseResult): UseCaseResult;
}
