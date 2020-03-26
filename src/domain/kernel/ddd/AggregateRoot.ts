import { AggregateIdentity, AggregateUuidType } from './AggregateIdentity';

export interface AggregateRoot<T extends AggregateUuidType> {
  readonly aggregateId: AggregateIdentity<T>;
}
