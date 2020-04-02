import {
  DomainObjectIdentity,
  AggregateUuidType,
} from './DomainObjectIdentity';
import { DomainEntity } from './DomainEntity';
import { Constructor } from '../building-blocks/Constructor';
import { SimplePlainObject } from '../building-blocks/SimplePlainObject';
export type AggregatePropertiesType = SimplePlainObject;
export abstract class AggregateRoot<T extends AggregateUuidType>
  implements DomainEntity<T> {
  constructor(public readonly aggregateId: DomainObjectIdentity<T>) {}

  public abstract getProperties(): AggregatePropertiesType;

  public getIdentity(): DomainObjectIdentity<T> {
    return this.aggregateId;
  }
}
