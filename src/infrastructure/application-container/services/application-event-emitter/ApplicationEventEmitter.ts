import { ApplicationEventType } from 'src/infrastructure/application-container/definitions';
import { EventArguments } from 'src/infrastructure/application-container/definitions/types';

export interface ApplicationEventEmitter {
  emit(eventType: ApplicationEventType, eventArguments: EventArguments);
}
