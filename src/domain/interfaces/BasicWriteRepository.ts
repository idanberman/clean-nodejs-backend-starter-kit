import { DomainEntity, DomainRepository } from '../kernel/ddd';
import { ValidEntityUid } from '../kernel/ddd/object-identity';
import { ValidPropertiesMap } from '../kernel/building-blocks/types';

export interface BasicWriteRepository<
  DomainEntityType extends DomainEntity<UuidType, ValidPropertiesMap>,
  UuidType extends ValidEntityUid
> extends DomainRepository {
  // tslint:disable-next-line: no-empty
  createEntity(entity: DomainEntityType): Promise<DomainEntityType>;
  updateEntity(entity: DomainEntityType): Promise<DomainEntityType>;
  removeEntity(entity: DomainEntityType): Promise<void>;
  removeById(id: UuidType): Promise<void>;
}
