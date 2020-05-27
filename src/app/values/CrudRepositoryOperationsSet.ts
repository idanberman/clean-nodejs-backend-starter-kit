import { ValueObject, DomainRepository } from '../../domain/kernel/ddd';

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
    if (!operation || typeof operation !== 'function') {
      throw TypeError(
        `'operation' parameter is invalid. Received: '${operation.toString()}'`,
      );
    }
  }

  public executeOperation(repository: Repository): void {
    this.operation(repository);
  }
}
