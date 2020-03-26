import { UseCaseContext, UseCaseResult } from '../use-case';

export interface UseCase {
  run(useCaseContext: UseCaseContext): Promise<UseCaseResult>;

  dispose();
}
