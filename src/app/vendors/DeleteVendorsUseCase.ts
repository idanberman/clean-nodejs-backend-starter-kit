import { UseCase } from '../use-case';
import { UseCaseContext } from '../context';
import { UseCaseResult } from '../use-case/UseCaseResult';

export class DeleteVendorsUseCase implements UseCase {
  public run(useCaseContext: UseCaseContext): Promise<UseCaseResult> {
    throw new Error('Method not implemented.');
  }
  public dispose() {
    throw new Error('Method not implemented.');
  }
}
