import { DomainEntity, DomainRepository } from '../kernel/ddd';
import { ValidEntityUid } from '../kernel/ddd/object-identity';
import { ValidEntityProperties } from '../kernel/building-blocks/types/types';

export interface BasicWriteRepository<
  DomainEntityType extends DomainEntity<UuidType, ValidEntityProperties>,
  UuidType extends ValidEntityUid
> extends DomainRepository {
  createEntity(entity: DomainEntityType): Promise<DomainEntityType>;
  updateEntity(entity: DomainEntityType): Promise<DomainEntityType>;
  removeEntity(entity: DomainEntityType): Promise<void>;
  removeById(id: UuidType): Promise<void>;
  softRemoveById(id: UuidType): Promise<void>;
  softRemoveByEntity(entity: DomainEntityType): Promise<void>;
  getTrashedById(id: UuidType): Promise<DomainEntityType>;
  getTrashed(): Promise<DomainEntityType>;
}
