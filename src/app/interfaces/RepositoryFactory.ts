import { DomainRepository } from 'src/domain/interfaces';
import { RepositoryId } from 'src/domain/RepositoryId';

export interface RepositoryFactory {
  get(
    repositoryType: RepositoryId,
    // Later implementation of transactions
    withTransaction?: any,
  ): DomainRepository;
}
