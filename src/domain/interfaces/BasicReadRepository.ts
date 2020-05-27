import { DomainEntity, DomainRepository } from '../kernel/ddd';
import { ValidEntityUid } from '../kernel/ddd/object-identity';

export interface BasicReadRepository<
  DomainEntityType extends DomainEntity<any, any>,
  UuidType extends ValidEntityUid
> extends DomainRepository {
  findAll(): Promise<DomainEntityType[]>;
  findById(id: UuidType): Promise<DomainEntityType>;
  findTrashedById(id: UuidType): Promise<DomainEntityType>;
  findTrashed(): Promise<DomainEntityType>;
}
