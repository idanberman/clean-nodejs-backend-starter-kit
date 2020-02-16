import { ApplicationEventType } from '../definitions';
import { EventArguments } from '../definitions/types';

export interface ApplicationEventEmitter {
  emit(eventType: ApplicationEventType, eventArguments: EventArguments);
}
