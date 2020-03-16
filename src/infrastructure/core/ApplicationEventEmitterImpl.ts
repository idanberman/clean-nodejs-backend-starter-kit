import { ApplicationEventType } from 'src/infrastructure/core/definitions/ApplicationEventType';
import {
  EventArguments,
  ApplicationEventHandler,
} from 'src/infrastructure/core/definitions/types';
import { EventEmitter } from 'events';
import { ApplicationEventEmitter } from 'src/infrastructure/core/interfaces';

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
