import { UseCase } from '../use-case';

export class ReadOneVendorsUseCase implements UseCase {
  run(
    useCaseContext: import('../context').UseCaseContext,
  ): Promise<import('../use-case/UseCaseResult').UseCaseResult> {
    throw new Error('Method not implemented.');
  }
  dispose() {
    throw new Error('Method not implemented.');
  }
}
