import { ApplicationEventEmitterImpl } from 'src/infrastructure/core/ApplicationEventEmitterImpl';
import { ApplicationEventType } from 'src/app/core/definitions';

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
