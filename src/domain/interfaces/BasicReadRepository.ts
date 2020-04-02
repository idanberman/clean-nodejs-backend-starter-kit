import { DomainEntity, DomainRepository } from '../kernel/ddd';
import { AggregateUuidType } from '../kernel/ddd/DomainObjectIdentity';

export interface BasicReadRepository<
  DomainEntityType extends DomainEntity<UuidType>,
  UuidType extends AggregateUuidType
> extends DomainRepository {
  findAll(): Promise<DomainEntityType[]>;
  findById(id: UuidType): Promise<DomainEntityType>;
}
