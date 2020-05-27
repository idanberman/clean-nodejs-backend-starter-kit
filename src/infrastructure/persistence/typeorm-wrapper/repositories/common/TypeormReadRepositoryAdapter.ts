import { TransactionContext, BasicReadRepository } from 'src/domain/interfaces';
import {
  TypeormEntity,
  PersistentToDomainEntityMapper,
} from 'src/infrastructure/persistence/typeorm-wrapper/definitions';
import { DomainEntity } from 'src/domain/kernel/ddd';
import { ValidEntityUid } from 'src/domain/kernel/ddd/object-identity';
import { Constructor } from 'src/domain/kernel/building-blocks/types';

// tslint:disable-next-line: no-empty-interface

export class TypeormReadRepositoryAdapter<
  DomainEntityType extends DomainEntity<UuidType, any>,
  PersistentEntityType extends TypeormEntity<UuidType>,
  UuidType extends ValidEntityUid
> implements BasicReadRepository<DomainEntityType, UuidType> {
  constructor(
    protected domainEntityMapper: PersistentToDomainEntityMapper<
      DomainEntityType,
      PersistentEntityType
    >,
    protected persistentEntityClass: Constructor<PersistentEntityType>,
    protected transactionContext: TransactionContext,
  ) {}

  public findAll(): Promise<DomainEntityType[]> {
    throw new Error('Method not implemented.');
  }
  public findById(id: UuidType): Promise<DomainEntityType> {
    throw new Error('Method not implemented.');
  }

  public getTrashedById(id: UuidType): Promise<DomainEntityType> {
    throw new Error('Method not implemented.');
  }
  public getTrashed(): Promise<DomainEntityType> {
    throw new Error('Method not implemented.');
  }
  public findTrashedById(id: UuidType): Promise<DomainEntityType> {
    throw new Error('Method not implemented.');
  }
  public findTrashed(): Promise<DomainEntityType> {
    throw new Error('Method not implemented.');
  }
}
