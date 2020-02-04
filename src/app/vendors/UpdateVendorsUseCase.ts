import { UseCase } from '../use-case';

export class UpdateVendorsUseCase implements UseCase {
  public run(
    useCaseContext: import('../context').UseCaseContext,
  ): Promise<import('../use-case/UseCaseResult').UseCaseResult> {
    throw new Error('Method not implemented.');
  }
  public dispose() {
    throw new Error('Method not implemented.');
  }
}
