import { DomainEntity, AggregateRoot, DomainRepository } from '../kernel/ddd';
import { AggregateUuidType } from '../kernel/ddd/DomainObjectIdentity';

export interface SoftDeletedRepository<
  DomainEntityType extends DomainEntity<UuidType>,
  UuidType extends AggregateUuidType
> extends DomainRepository {
  setSoftDeleted(id: number, deleted: boolean): Promise<void>;
}
