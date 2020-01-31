import { UseCaseResult } from 'src/app/use-case/UseCaseResult';

export interface UseCaseResultPresenter {
  present(result: UseCaseResult): UseCaseResult;
}
