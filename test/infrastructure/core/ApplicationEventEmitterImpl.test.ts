import { ApplicationEventEmitterImpl } from 'src/infrastructure/application-container/services/application-event-emitter/ApplicationEventEmitterImpl';
import { ApplicationEventType } from 'src/infrastructure/application-container/definitions';

describe('ApplicationEventEmitterImpl.class', () => {
  describe('subscribe and emit', () => {
    it('should emit event and receive it', () => {
      const eventEmitter = new ApplicationEventEmitterImpl();

      const listenerMock = jest.fn();

      eventEmitter.subscribe(
        ApplicationEventType.ResourceHasReachedReadyState,
        listenerMock,
      );

      const args = {
        resourceId: 'test resource',
      };
      eventEmitter.emit(
        ApplicationEventType.ResourceHasReachedReadyState,
        args,
      );
      expect(listenerMock).toBeCalledWith(args);
    });
  });
});
