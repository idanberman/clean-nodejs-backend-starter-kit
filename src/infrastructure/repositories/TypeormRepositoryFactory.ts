import { RepositoryFactory } from 'src/app/interfaces';
import { DomainRepository } from 'src/domain/interfaces';
import { EntityManager } from 'typeorm';
import { RepositoryId } from 'src/domain/RepositoryId';
import { VendorsRepository } from 'src/domain/vendors';
import { TypeormVendorsReadWriteRepository } from './repositories';

export class TypeormRepositoryFactory implements RepositoryFactory {
  repositoriesFactoriesByToken: Map<RepositoryId, () => DomainRepository>;
  constructor(private readonly entityManager: EntityManager) {
    this.repositoriesFactoriesByToken = new Map<
      RepositoryId,
      () => DomainRepository
    >();

    this.repositoriesFactoriesByToken.set(
      RepositoryId.VendorsRepository,
      () => new TypeormVendorsReadWriteRepository(entityManager),
    );
  }

  private getRepositoryFactoryByToken<T extends DomainRepository>(
    repositoryId: RepositoryId,
  ): () => DomainRepository {
    if (!this.repositoriesFactoriesByToken.has(repositoryId)) {
      throw new Error(
        `Repository '${repositoryId}' implementation is missing.`,
      );
    }

    return this.repositoriesFactoriesByToken.get(repositoryId);
  }

  public get(
    repositoryId: RepositoryId,
    // Later implementation of transactions
    withTransaction?: any,
  ): DomainRepository {
    return this.getRepositoryFactoryByToken(repositoryId);
  }
}
