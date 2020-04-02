import { AggregateUuidType } from 'src/domain/kernel/ddd/DomainObjectIdentity';
import { DbEntityUuidType, TypeormEntity } from '../../definitions';
import { DomainEntity } from 'src/domain/kernel/ddd';
import { DomainEntitiesMapper } from '../../definitions/DomainEntitiesMapper';
import { Constructor } from 'src/domain/kernel/building-blocks/Constructor';
import { SimplePlainObject } from 'src/domain/kernel/building-blocks/SimplePlainObject';

export class DomainEntityMapperGenerator {
  public generate<
    DomainEntityType extends Constructor<DomainEntity<AggregateUuidType>>,
    DbEntityType extends Constructor<TypeormEntity<DbEntityUuidType>>
  >(
    domainEntityType: DomainEntityType,
    dbEntityType: DbEntityType,
    properties:
      | (keyof DomainEntityType & keyof DbEntityType)[]
      | Constructor<SimplePlainObject>,
  ): DomainEntitiesMapper<DomainEntityType, DbEntityType> {
    return {
      mapFromDb: this.generateMapFromDb(),
      mapToDb: this.generateMapToDb(),
    };
  }
  generateMapFromDb<
    DomainEntityType extends Constructor<DomainEntity<AggregateUuidType>>,
    DbEntityType extends Constructor<TypeormEntity<DbEntityUuidType>>
  >(
    domainEntityType: DomainEntityType,
    dbEntityType: DbEntityType,
    properties:
      | (keyof DomainEntityType & keyof DbEntityType)[]
      | Constructor<SimplePlainObject>,
  ): (dbEntity: DbEntityType) => DomainEntityType {
    return (dbEntity: DbEntityType) => {
      const domainEntity: DomainEntity = new domainEntityType();
      return;
    };
  }
  generateMapToDb<
    DomainEntityType extends Constructor<DomainEntity<AggregateUuidType>>,
    DbEntityType extends Constructor<TypeormEntity<DbEntityUuidType>>
  >(
    domainEntityType: DomainEntityType,
    dbEntityType: DbEntityType,
    properties:
      | (keyof DomainEntityType & keyof DbEntityType)[]
      | Constructor<SimplePlainObject>,
  ) {}

  copyProperties<
    DomainEntityType extends Constructor<DomainEntity<AggregateUuidType>>,
    DbEntityType extends Constructor<TypeormEntity<DbEntityUuidType>>
  >(
    domainEntityType: DomainEntityType,
    dbEntityType: DbEntityType,
    properties:
      | (keyof DomainEntityType & keyof DbEntityType)[]
      | Constructor<SimplePlainObject>,
  ) {}
}
