import {
  EntityManager,
  Repository,
  InsertResult,
  DeepPartial,
  QueryRunner,
  EntitySchema,
  ObjectType,
} from 'typeorm';
import {
  WriteResourceNotFoundError,
  ReadResourceNotFoundError,
} from 'src/domain/kernel/errors/operation';
import { TypeormEntity } from '../../definitions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DomainEntity } from 'src/domain/kernel/ddd';
import { ValidEntityUid } from 'src/domain/kernel/ddd/object-identity';
import {
  Constructor,
  ValidPropertiesMap,
  RepositoryReadingResult,
} from 'src/domain/kernel/building-blocks/types';
import { BasicWriteRepository } from 'src/domain/interfaces';
import { TransactionContext } from 'src/domain/interfaces/TransactionContext';

export class WriteRepositoryTypeormAdapter<
  DomainEntityType extends DomainEntity<UuidType, ValidPropertiesMap>,
  DbEntityType extends TypeormEntity<UuidType>,
  UuidType extends ValidEntityUid
> implements BasicWriteRepository<DomainEntityType, UuidType> {
  constructor(
    protected domainEntityClass: Constructor<DomainEntityType>,
    protected dbEntityClass: Constructor<DbEntityType>,
    protected transactionContext: TransactionContext,
  ) {}

  protected get dbContext(): QueryRunner {
    return this.transactionContext.getRawResourceContext();
  }

  public async getAll(): Promise<DomainEntityType[]> {
    return await this.dbContext.manager
      .createQueryBuilder<DbEntityType>(
        this.dbEntityClass as ObjectType<DbEntityType>,
        'vendor',
      )
      .getMany();
  }

  public async findById(id: UuidType): Promise<DomainEntityType> {
    return await this.typeormRepository.findOne(id);
  }

  public async createEntity(
    entity:
      | QueryDeepPartialEntity<DomainEntityType>
      | QueryDeepPartialEntity<DomainEntityType>[],
  ): Promise<DomainEntityType> {
    const insertResult: InsertResult = await this.manager.insert(
      this.target,
      entity,
    );

    return ({ ...entity, ...insertResult.identifiers[0] } as unknown) as T;
  }

  protected async findOneOrError(id: any): Promise<DomainEntityType> {
    const dbEntity: T = await this.typeormRepository.findOne(id);

    if (!dbEntity) {
      throw new ReadResourceNotFoundError('id', id);
    }

    return dbEntity;
  }
  public async updateEntity(
    id: any,
    entity: Partial<DomainEntityType>,
  ): Promise<Partial<DomainEntityType>> {
    let dbEntity: T;
    try {
      dbEntity = await this.findOneOrError(id);
    } catch (error) {
      throw new WriteResourceNotFoundError('id', id);
    }

    const updatedEntity = await this.typeormRepository.save(
      ({
        ...dbEntity,
        ...entity,
      } as unknown) as DeepPartial<DomainEntityType>,
      { reload: true },
    );

    return {
      ...dbEntity,
      ...updatedEntity,
    } as Partial<DomainEntityType>;
  }
  public async removeEntity(entity: T): Promise<void> {
    try {
      await this.typeormRepository.remove(entity);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async removeById(id: any): Promise<void> {
    const entityToRemove: T = await this.findOneOrError(id);

    if (!entityToRemove) {
      throw new WriteResourceNotFoundError('id', id);
    }
    await this.removeEntity(entityToRemove);
  }
}
