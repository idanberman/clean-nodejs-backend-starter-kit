import { UseCase } from 'src/domain/kernel/ddd/UseCase';
import { UseCaseContext } from 'src/domain/kernel/use-case/UseCaseContext';
import { UseCaseResult } from 'src/domain/kernel/use-case/UseCaseResult';
import { UseCaseTerminationStatus } from 'src/domain/kernel/use-case/UseCaseTerminationStatus';
import { UseCaseResultPresenter } from 'src/domain/interfaces';
import { UseCaseDispatcher } from 'src/app/use-cases/common/use-case-dispatcher';

console = {
  ...console,
  log: jest.fn(),

  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

describe('UseCaseDispatcherService.class', () => {
  const dispatcher: UseCaseDispatcher = new UseCaseDispatcher();

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
