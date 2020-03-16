import { ApplicationEventType } from 'src/infrastructure/core/definitions';
import { EventArguments } from 'src/infrastructure/core/definitions/types';

export interface ApplicationEventEmitter {
  emit(eventType: ApplicationEventType, eventArguments: EventArguments);
}
