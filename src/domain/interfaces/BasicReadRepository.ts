import { DomainEntity, DomainRepository } from '../kernel/ddd';
import { ValidEntityUid } from '../kernel/ddd/object-identity';
import { ValidPropertiesMap } from '../kernel/building-blocks/types';

export interface BasicReadRepository<
  DomainEntityType extends DomainEntity<UuidType, ValidPropertiesMap>,
  UuidType extends ValidEntityUid
> extends DomainRepository {
  findAll(): Promise<DomainEntityType[]>;
  findById(id: UuidType): Promise<DomainEntityType>;
}
