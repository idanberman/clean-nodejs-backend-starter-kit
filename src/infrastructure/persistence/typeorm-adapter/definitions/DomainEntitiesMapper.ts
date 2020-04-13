import { DomainEntity } from 'src/domain/kernel/ddd';
import { ValidEntityUid } from 'src/domain/kernel/ddd/object-identity';
import { TypeormEntity } from './TypeormEntity';
import { ValidDbEntityUuid } from './DbEntityUuidType';
import { ValidPropertiesMap } from 'src/domain/kernel/building-blocks/types';

export interface DomainEntitiesMapper<
  DomainEntityType extends DomainEntity<ValidEntityUid, ValidPropertiesMap>,
  DbEntityType extends TypeormEntity<ValidDbEntityUuid>
> {
  mapFromDb(dbEntity: DbEntityType): DomainEntityType;
  mapToDb(domainEntity: DomainEntityType): DbEntityType;
}
