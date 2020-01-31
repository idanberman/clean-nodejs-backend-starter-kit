import { UseCase } from '../use-case';
import { UseCaseContext } from '../context/UseCaseContext';
import { UseCaseResultPresenter } from '../interfaces/UseCaseResultPresenter';
import { UseCaseResult } from '../use-case/UseCaseResult';
import { VendorsRepository } from 'src/domain/vendors';
import { RepositoryFactory } from '../interfaces';

export class GetAllVendorsUseCase implements UseCase {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}
  // tslint:disable-next-line: no-empty
  dispose() {}
  run(
    useCaseContext: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult> {
    throw new Error('Method not implemented.');
  }
}
