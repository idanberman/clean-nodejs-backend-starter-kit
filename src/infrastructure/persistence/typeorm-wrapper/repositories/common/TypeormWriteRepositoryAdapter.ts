import {
  EntityManager,
  Repository,
  InsertResult,
  DeepPartial,
  QueryRunner,
  EntitySchema,
  ObjectType,
  UpdateResult,
  DeleteResult,
} from 'typeorm';
import {
  WriteResourceNotFoundError,
  ReadResourceNotFoundError,
} from 'src/domain/kernel/errors/operation';
import { TypeormEntity } from '../../definitions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DomainEntity } from 'src/domain/kernel/ddd';
import { Constructor } from 'src/domain/kernel/building-blocks/types';
import { BasicWriteRepository } from 'src/domain/interfaces';
import { TransactionContext } from 'src/domain/interfaces/TransactionContext';
import { PersistentToDomainEntityMapper } from '../../definitions/DomainEntityMapper';
import { ValidEntityUid } from 'src/domain/kernel/ddd/object-identity';

export class TypeormWriteRepositoryAdapter<
  DomainEntityType extends DomainEntity<any, any>,
  PersistentEntityType extends TypeormEntity<UuidType>,
  UuidType extends ValidEntityUid
> implements BasicWriteRepository<DomainEntityType, UuidType> {
  constructor(
    protected domainEntityMapper: PersistentToDomainEntityMapper<
      DomainEntityType,
      PersistentEntityType
    >,
    protected persistentEntityClass: Constructor<PersistentEntityType>,
    protected transactionContext: TransactionContext,
  ) {}

  protected get typeormEntityManager(): EntityManager {
    return (this.transactionContext.getRawResourceContext() as QueryRunner)
      .manager;
  }

  public async getAll(): Promise<DomainEntityType[]> {
    const result: PersistentEntityType[] = await this.typeormEntityManager
      .createQueryBuilder<PersistentEntityType>(
        this.persistentEntityClass as ObjectType<PersistentEntityType>,
        'entity',
      )
      .getMany();
    return result.map(this.domainEntityMapper.mapFromPersistent);
  }

  public async getById(id: UuidType): Promise<DomainEntityType> {
    return this.domainEntityMapper.mapFromPersistent(
      await this.typeormEntityManager
        .createQueryBuilder<PersistentEntityType>(
          this.persistentEntityClass as ObjectType<PersistentEntityType>,
          'entity',
        )
        .whereInIds(id)
        .getOne(),
    );
  }

  public async createEntity(
    entity: DomainEntityType,
  ): Promise<DomainEntityType> {
    const insertResult: InsertResult = await this.typeormEntityManager
      .createQueryBuilder<PersistentEntityType>(
        this.persistentEntityClass as ObjectType<PersistentEntityType>,
        'entity',
      )
      .insert()
      .values(
        (this.domainEntityMapper.mapToPersistent(
          entity,
        ) as unknown) as QueryDeepPartialEntity<PersistentEntityType>,
      )
      .execute();
    throw new Error(
      'Not implemented:: Should update the id of the entity with ' +
        insertResult.generatedMaps.map((map) => map.toString()),
    );

    return entity;
  }
  public async updateEntity(
    entity: DomainEntityType,
  ): Promise<DomainEntityType> {
    const persistentEntity: PersistentEntityType = this.domainEntityMapper.mapToPersistent(
      entity,
    );
    const updateResult: UpdateResult = await this.typeormEntityManager
      .createQueryBuilder<PersistentEntityType>(
        this.persistentEntityClass as ObjectType<PersistentEntityType>,
        'entity',
      )
      .update()
      .set(
        (persistentEntity as unknown) as QueryDeepPartialEntity<
          PersistentEntityType
        >,
      )
      .whereInIds(persistentEntity.getIdValue())
      .execute();
    if (updateResult.affected === 0) {
      throw new Error('Error not implemented. nothing to update');
    }
    return entity;
  }
  public async removeEntity(entity: DomainEntityType): Promise<void> {
    const persistentEntity: PersistentEntityType = this.domainEntityMapper.mapToPersistent(
      entity,
    );
    return this.removeById(persistentEntity.getIdValue());
  }
  public async removeById(id: UuidType): Promise<void> {
    const removeResult: DeleteResult = await this.typeormEntityManager
      .createQueryBuilder<PersistentEntityType>(
        this.persistentEntityClass as ObjectType<PersistentEntityType>,
        'entity',
      )
      .delete()
      .whereInIds(id)
      .execute();

    if (removeResult.affected === 0) {
      throw new Error('Error not implemented. nothing to remove ');
    }
  }

  public softRemoveById(id: UuidType): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public softRemoveByEntity(entity: DomainEntityType): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public getTrashedById(id: UuidType): Promise<DomainEntityType> {
    throw new Error('Method not implemented.');
  }
  public getTrashed(): Promise<DomainEntityType> {
    throw new Error('Method not implemented.');
  }
}
