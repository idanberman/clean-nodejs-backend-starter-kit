import {
  UseCase,
  UseCaseResultPresenter,
  UseCaseTerminationStatus,
} from 'src/app/use-case/definitions';

import { UseCaseContext, SecurityContext } from 'src/app/use-case/context';
import { UseCaseInput } from 'src/app/use-case/input';
import { UseCaseDispatcherService } from 'src/app/services';
import { UseCaseResult } from 'src/app/use-case/results';

console = {
  ...console,
  log: jest.fn(),

  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

describe('UseCaseDispatcherService.class', () => {
  const dispatcher: UseCaseDispatcherService = new UseCaseDispatcherService();

  describe('dispatch.method', () => {
    const presentMethodMock: jest.Mock = jest.fn();
    const presenterMock: jest.Mock<UseCaseResultPresenter> = jest
      .fn()
      .mockImplementation(() => ({ present: presentMethodMock }));
    beforeEach(() => {
      presentMethodMock.mockClear();
      presenterMock.mockClear();
    });
    it('error thrown while running use case should present as expected UseCaseResult shape  ', async () => {
      jest.spyOn(console, 'log');
      const useCaseMock: jest.Mock<UseCase> = jest
        .fn()
        .mockImplementation(() => ({
          run: jest
            .fn()
            .mockReturnValue(Promise.reject(new Error('test error'))),
        }));

      const useCaseContext: UseCaseContext = {
        input: {
          parameters: 'params test',
          data: 'data test',
        },
        securityContext: {
          userId: 'testUserId',
        },
      };

      await dispatcher.dispatch(useCaseMock(), useCaseContext, presenterMock());
      const presentArgument: UseCaseResult = presentMethodMock.mock.calls[0][0];
      expect(presentArgument).toBeInstanceOf(UseCaseResult);
      expect(presentArgument.terminationStatus).toEqual(
        UseCaseTerminationStatus.InternalError,
      );
    });

    it('should lead to present success use case result', async () => {
      jest.spyOn(console, 'log');

      const useCaseMock: jest.Mock<UseCase> = jest
        .fn()
        .mockImplementation(() => ({
          run: jest
            .fn()
            .mockReturnValue(
              Promise.resolve(UseCaseResult.success('test result')),
            ),
        }));

      const useCaseContext: UseCaseContext = {
        input: {
          parameters: 'params test',
          data: 'data test',
        },
        securityContext: {
          userId: 'testUserId',
        },
      };

      await dispatcher.dispatch(useCaseMock(), useCaseContext, presenterMock());
      const presentArgument: UseCaseResult = presentMethodMock.mock.calls[0][0];
      expect(presentArgument).toBeInstanceOf(UseCaseResult);
      expect(presentArgument.terminationStatus).toEqual(
        UseCaseTerminationStatus.Succeed,
      );
    });
  });
});
