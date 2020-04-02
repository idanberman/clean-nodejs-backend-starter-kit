import { DomainEntity, DomainRepository } from '../kernel/ddd';
import { AggregateUuidType } from '../kernel/ddd/DomainObjectIdentity';

export interface BasicWriteRepository<
  DomainEntityType extends DomainEntity<UuidType>,
  UuidType extends AggregateUuidType
> extends DomainRepository {
  createEntity(entity: DomainEntityType): Promise<DomainEntityType>;
  updateEntity(
    id: UuidType,
    entity: Partial<DomainEntityType>,
  ): Promise<DomainEntityType>;
  removeEntity(entity: DomainEntityType): Promise<void>;
  removeById(id: any): Promise<void>;
}
