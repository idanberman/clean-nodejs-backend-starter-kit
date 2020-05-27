import { ApplicationEventType } from 'src/infrastructure/application-container/definitions/ApplicationEventType';
import {
  EventArguments,
  ApplicationEventHandler,
} from 'src/infrastructure/application-container/definitions/types';
import { EventEmitter } from 'events';
import { ApplicationEventEmitter } from '.';

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