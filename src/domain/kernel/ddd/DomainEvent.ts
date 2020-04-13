import { ValueObject } from './ValueObject';
import { ValidPropertiesMap } from '../building-blocks/types';
import { StandardUuid } from './object-identity';
import { TimeStamp } from '../building-blocks/values/TimeStamp';

type ValidEventProperties = ValidPropertiesMap & {
  eventUuid: string;
  timestamp: TimeStamp;
};
export abstract class DomainEvent<
  EventProperties extends ValidEventProperties
> extends ValueObject<EventProperties> {
  constructor(properties: Exclude<EventProperties, 'eventUuid'>) {
    super({
      ...properties,
      eventUuid: StandardUuid.create(),
    });
  }
}
