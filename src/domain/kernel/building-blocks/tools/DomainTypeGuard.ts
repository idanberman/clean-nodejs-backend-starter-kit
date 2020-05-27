import { DomainEntity, ValueObject, AggregateRoot } from '../../ddd';

export class DomainTypeGuard {
  public static isDomainEntity(
    toBeDetermined: any,
  ): toBeDetermined is DomainEntity<any, any> {
    return (
      typeof toBeDetermined === 'object' &&
      toBeDetermined instanceof ValueObject
    );
    return false;
  }

  // public static isAggregateRoot(
  //   toBeDetermined: any,
  // ): toBeDetermined is AggregateRoot<any, any> {
  //   return false;
  // }

  public static isValueObject(
    toBeDetermined: any,
  ): toBeDetermined is ValueObject<any> {
    return (
      typeof toBeDetermined === 'object' &&
      toBeDetermined instanceof ValueObject
    );
  }
}
