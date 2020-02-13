import { UseCaseContext } from '../context';
import { UseCaseResult } from '../results';

export interface UseCase {
  run(useCaseContext: UseCaseContext): Promise<UseCaseResult>;

  dispose();
}
