import { DomainEntity, AggregateRoot, DomainRepository } from '../kernel/ddd';
import { ValidEntityUid } from '../kernel/ddd/object-identity';
import { ValidPropertiesMap } from '../kernel/building-blocks/types';
import { BasicWriteRepository } from './BasicWriteRepository';

export interface SoftDeletedRepository<
  DomainEntityType extends DomainEntity<UuidType, ValidPropertiesMap>,
  UuidType extends ValidEntityUid
> extends BasicWriteRepository<DomainEntityType, UuidType>, DomainRepository {
  softRemoveById(id: UuidType): Promise<void>;
  softRemoveByEntity(entity: DomainEntityType): Promise<void>;
  getTrashedById(id: UuidType): Promise<DomainEntityType>;
  getTrashed(): Promise<DomainEntityType>;
}
