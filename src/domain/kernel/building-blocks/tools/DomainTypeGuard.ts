import { DomainEntity, ValueObject, AggregateRoot } from '../../ddd';

export function isDomainEntity(
  toBeDetermined: any,
): toBeDetermined is DomainEntity<any, any> {
  return (
    typeof toBeDetermined === 'object' && toBeDetermined instanceof ValueObject
  );
  return false;
}

// export function isAggregateRoot(
//   toBeDetermined: any,
// ): toBeDetermined is AggregateRoot<any, any> {
//   return false;
// }

export function isValueObject(
  toBeDetermined: any,
): toBeDetermined is ValueObject<any> {
  return (
    typeof toBeDetermined === 'object' && toBeDetermined instanceof ValueObject
  );
}
