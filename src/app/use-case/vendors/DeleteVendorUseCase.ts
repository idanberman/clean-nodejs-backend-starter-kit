import { UseCase } from '..';
import { UseCaseContext } from '../../context';
import { UseCaseResult } from '../UseCaseResult';

export class DeleteVendorUseCase implements UseCase {
  public run(useCaseContext: UseCaseContext): Promise<UseCaseResult> {
    throw new Error('Method not implemented.');
  }
  public dispose() {
    throw new Error('Method not implemented.');
  }
}
