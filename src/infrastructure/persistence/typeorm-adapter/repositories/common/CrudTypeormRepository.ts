import { EntityManager, Repository, InsertResult, DeepPartial } from 'typeorm';
import {
  WriteResourceNotFoundError,
  ReadResourceNotFoundError,
} from 'src/domain/kernel/errors/operation';
import { TypeormEntity } from '../../definitions/';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DbEntityUuidType } from '../../definitions';
import { DomainEntity } from 'src/domain/kernel/ddd';
import { AggregateUuidType } from 'src/domain/kernel/ddd/DomainObjectIdentity';
import { DomainEntitiesMapper } from '../../definitions/DomainEntitiesMapper';
import { Constructor } from 'src/domain/kernel/building-blocks';

export class CrudTypeormRepository<
  DomainEntityType extends DomainEntity<UuidType>,
  DbEntityType extends TypeormEntity<UuidType>,
  UuidType extends AggregateUuidType
> {
  protected readonly typeormRepository: Repository<DbEntityType>;
  private readonly entityType: string;
  constructor(
    protected domainEntityClass: Constructor<DomainEntityType>,
    protected dbEntityClass: Constructor<DbEntityType>,
    protected manager: EntityManager,
  ) {
    this.typeormRepository = manager.getRepository(dbEntityClass);
    this.entityType = dbEntityClass.name;
  }
  public async findAll(): Promise<T[]> {
    return await this.typeormRepository.find();
  }

  public async findById(id: any): Promise<T> {
    return await this.typeormRepository.findOne(id);
  }

  public async createEntity(
    entity: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[],
  ): Promise<T> {
    const insertResult: InsertResult = await this.manager.insert(
      this.target,
      entity,
    );

    return ({ ...entity, ...insertResult.identifiers[0] } as unknown) as T;
  }

  protected async findOneOrError(id: any): Promise<T> {
    const dbEntity: T = await this.typeormRepository.findOne(id);

    if (!dbEntity) {
      throw new ReadResourceNotFoundError('id', id);
    }

    return dbEntity;
  }
  public async updateEntity(id: any, entity: Partial<T>): Promise<Partial<T>> {
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
      } as unknown) as DeepPartial<T>,
      { reload: true },
    );

    return {
      ...dbEntity,
      ...updatedEntity,
    } as Partial<T>;
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
