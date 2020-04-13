import { ValueObject, DomainRepository } from '../../ddd';

export type CrudRepositoryOperationExecutor = <
  Repository extends DomainRepository
>(
  repository: Repository,
) => void;
export class CrudRepositoryOperation<
  Repository extends DomainRepository
> extends ValueObject<{}> {
  constructor(private operation: CrudRepositoryOperationExecutor) {
    super({});
  }

  public executeOperation(repository: Repository): void {
    this.operation(repository);
  }
}
