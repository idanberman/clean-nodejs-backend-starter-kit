import {
  DomainObjectIdentity,
  AggregateUuidType,
} from './DomainObjectIdentity';

export interface DomainEntity<T extends AggregateUuidType> {
  getIdentity(): DomainObjectIdentity<T>;
}
