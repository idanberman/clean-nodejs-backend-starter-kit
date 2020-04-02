import { CrudTypeormRepository } from './CrudTypeormRepository';
import {
  SoftDeletedRepository,
  BasicReadRepository,
  BasicWriteRepository,
} from 'src/domain/interfaces';
import { WriteResourceNotFoundError } from 'src/domain/kernel/errors/operation';
import { DeepPartial, ObjectType, EntityManager } from 'typeorm';
import {
  DbEntityWithSoftDeleteAbility,
  TypeormEntity,
} from 'src/infrastructure/persistence/typeorm-adapter/definitions';
import { DomainEntity } from 'src/domain/kernel/ddd';
import { AggregateUuidType } from 'src/domain/kernel/ddd/DomainObjectIdentity';
import { Constructor } from 'src/domain/kernel/building-blocks';

// tslint:disable-next-line: no-empty-interface

export class CrudWithSoftDeleteAbilityTypeormRepository<
  DomainEntityType extends DomainEntity<UuidType>,
  DbEntityType extends TypeormEntity<UuidType>,
  UuidType extends AggregateUuidType
> extends CrudTypeormRepository<DomainEntityType, DbEntityType, UuidType> {
  constructor(
    domainEntityClass: Constructor<DomainEntityType>,
    dbEntityClass: Constructor<DbEntityType>,
    manager: EntityManager,
  ) {
    super(domainEntityClass, dbEntityClass, manager);
  }
  public async setSoftDeleted(id: number, deleted: boolean): Promise<void> {
    let dbEntity: T;
    try {
      dbEntity = await this.crudRepository.findById(id);
    } catch (error) {
      throw new WriteResourceNotFoundError('id', String(id));
    }

    await this.crudRepository.updateEntity(id, ({
      ...dbEntity,
      deletedAt: new Date(),
    } as unknown) as DeepPartial<T>);
  }
}
