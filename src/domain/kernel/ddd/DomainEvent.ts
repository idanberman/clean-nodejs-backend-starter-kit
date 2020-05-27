import { ValueObject } from './ValueObject';
import { StandardUuid } from './object-identity';
import { TimeStamp } from '../building-blocks/values/TimeStamp';
import { PlainValueObject } from '../building-blocks/interfaces/PlainValueObject';
import {
  Serializable,
  ValidValueObjectProperties,
} from '../building-blocks/types';

type EventRequiredProperties = {
  eventUuid: StandardUuid;
  timestamp: TimeStamp;
};
export abstract class DomainEvent<
  EventProperties extends ValidValueObjectProperties & EventRequiredProperties
> extends ValueObject<EventProperties> implements Serializable {
  constructor(properties: Exclude<EventProperties, 'eventUuid'>) {
    super({
      ...properties,
      eventUuid: StandardUuid.create(),
    });
  }
  serialize(): import('../building-blocks/types/types').ValidMap<
    import('../building-blocks/types/types').DeepConstraint<
      | string
      | number
      | boolean
      | import('../building-blocks/types/types').ValidList<
          import('../building-blocks/types/types').PrimitiveConstraint
        >
      | import('../building-blocks/types/types').ValidMap<
          import('../building-blocks/types/types').PrimitiveConstraint
        >
    >
  > {
    throw new Error('Method not implemented.');
  }
  public deserialize(
    plainObject: import('../building-blocks/types/types').ValidMap<
      import('../building-blocks/types/types').DeepConstraint<
        | string
        | number
        | boolean
        | import('../building-blocks/types/types').ValidList<
            import('../building-blocks/types/types').PrimitiveConstraint
          >
        | import('../building-blocks/types/types').ValidMap<
            import('../building-blocks/types/types').PrimitiveConstraint
          >
      >
    >,
  ): void {
    throw new Error('Method not implemented.');
  }
}
