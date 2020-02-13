import { UseCaseContext } from '../context/UseCaseContext';
import { UseCaseResult } from '../results/UseCaseResult';

export interface UseCase {
  run(useCaseContext: UseCaseContext): Promise<UseCaseResult>;

  dispose();
}
