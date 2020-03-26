import { UseCaseResult } from 'src/domain/kernel/use-case';

export interface UseCaseResultPresenter {
  present(result: UseCaseResult): UseCaseResult;
}
