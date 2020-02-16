import { ApplicationEventType } from 'src/app/core/definitions/ApplicationEventType';
import {
  ResourceId,
  UnderlyingResourceEventArguments,
  UnderlyingResourceEventHandler,
  EventArguments,
  ApplicationEventHandler,
} from 'src/app/core/definitions/types';
import { EventEmitter } from 'events';
import { ApplicationEventEmitter } from 'src/app/core/interfaces';

export class ApplicationEventEmitterImpl implements ApplicationEventEmitter {
  private readonly eventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  public emit(eventType: ApplicationEventType, eventArguments: EventArguments) {
    this.eventEmitter.emit(eventType, eventArguments);
  }

  public subscribe(
    eventType: ApplicationEventType,
    eventHandler: ApplicationEventHandler,
  ) {
    this.eventEmitter.on(eventType, eventHandler);
  }
}
