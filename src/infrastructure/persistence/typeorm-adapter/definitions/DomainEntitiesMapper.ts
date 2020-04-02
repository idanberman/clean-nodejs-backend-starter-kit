import { DomainEntity } from 'src/domain/kernel/ddd';
import { AggregateUuidType } from 'src/domain/kernel/ddd/DomainObjectIdentity';
import { TypeormEntity } from './TypeormEntity';
import { DbEntityUuidType } from './DbEntityUuidType';

export interface DomainEntitiesMapper<
  DomainEntityType extends DomainEntity<AggregateUuidType>,
  DbEntityType extends TypeormEntity<DbEntityUuidType>
> {
  mapFromDb(dbEntity: DbEntityType): DomainEntityType;
  mapToDb(domainEntity: DomainEntityType): DbEntityType;
}
