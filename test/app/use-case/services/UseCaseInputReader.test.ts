import { InputService, InputReadingResult } from 'src/app/services/input';
import { UseCaseInputReader } from 'src/app/use-case/services';
import { UseCaseInput } from 'src/app/use-case/input';
import { UseCaseInputReaderImpl } from 'src/app/use-case/services';
import {
  UseCaseInputErrorDescription,
  InputSyntaxError,
} from 'src/domain/errors/operation';

describe('UseCaseInputReader.class', () => {
  describe('read.method', () => {
    const validInputFromFreeObjectMock = jest
      .fn()
      .mockImplementation((toValue, input: UseCaseInput) =>
        InputReadingResult.createSucceed({
          expectedShape: input,
        }),
      );

    const InputServiceMock: jest.Mock<InputService> = jest
      .fn()
      .mockImplementation(() => {
        return {
          validInputFromFreeShapeObject: validInputFromFreeObjectMock,
        };
      });
    let inputReader: UseCaseInputReader;

    beforeEach(() => {
      InputServiceMock.mockClear();
      inputReader = new UseCaseInputReaderImpl(InputServiceMock());
    });

    it('The callbacks should be called with the correct UseCaseInput', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };

      const [readValue] = inputReader.read(input, [
        (input: UseCaseInput, inputService: InputService) => {
          return inputService.validInputFromFreeShapeObject(
            'expectedShapeValue',
            input,
          );
        },
      ]);
      expect(readValue).toEqual({ expectedShape: input });
    });

    it('should return single value list on success reading', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };
      const inputReadingResult: InputReadingResult = InputReadingResult.createSucceed(
        String('mocked succeed result'),
      );
      const inputCallBack = jest.fn().mockReturnValue(inputReadingResult);
      const results = inputReader.read(input, [inputCallBack]);
      expect(results).toBeInstanceOf(Array);

      expect(results[0]).toEqual(String('mocked succeed result'));
    });

    it('should return list of many values on success reading', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };
      const inputReadingResult: InputReadingResult = InputReadingResult.createSucceed(
        String('mocked succeed result'),
      );
      const inputCallBack = jest.fn().mockReturnValue(inputReadingResult);

      const inputReadingResult2: InputReadingResult = InputReadingResult.createSucceed(
        String('mocked succeed result2'),
      );
      const inputCallBack2 = jest.fn().mockReturnValue(inputReadingResult2);
      const results = inputReader.read(input, [inputCallBack, inputCallBack2]);
      expect(results).toBeInstanceOf(Array);

      expect(results[0]).toEqual(String('mocked succeed result'));
      expect(results[1]).toEqual(String('mocked succeed result2'));
    });

    it('should return error descriptions array  when failed to perform reading', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };
      const errorDescriptionsArray = [
        new UseCaseInputErrorDescription(
          ['email is invalid'],
          'email',
          'userDetails',
        ),
      ];
      const inputReadingResult: InputReadingResult = InputReadingResult.createFailed(
        errorDescriptionsArray,
      );
      const inputCallBack = jest.fn().mockReturnValue(inputReadingResult);
      expect(() => {
        try {
          inputReader.read(input, [inputCallBack]);
          throw new Error('test failed - error should be thrown');
        } catch (receivedError) {
          expect(receivedError).toBeInstanceOf(InputSyntaxError);
          expect(receivedError.errors).toBe(errorDescriptionsArray);
        }
      });
    });

    it('should return one error with list of all descriptions of the errors and omit successful results', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };
      const errorDescriptionsArray = [
        new UseCaseInputErrorDescription(
          ['email is invalid'],
          'email',
          'userDetails',
        ),
      ];
      const inputReadingResult: InputReadingResult = InputReadingResult.createFailed(
        errorDescriptionsArray,
      );
      const inputCallBack = jest.fn().mockReturnValue(inputReadingResult);

      const errorDescriptionsArray2 = [
        new UseCaseInputErrorDescription(
          ['password is too short'],
          'password',
          'userAuthentication',
        ),
      ];
      const inputReadingResult2: InputReadingResult = InputReadingResult.createFailed(
        errorDescriptionsArray2,
      );
      const inputCallBack2 = jest.fn().mockReturnValue(inputReadingResult2);

      const succeedInputReadingResult: InputReadingResult = InputReadingResult.createSucceed(
        String('mocked succeed result'),
      );
      const succeedInputCallBack = jest
        .fn()
        .mockReturnValue(succeedInputReadingResult);

      expect(() => {
        try {
          inputReader.read(input, [
            inputCallBack,
            succeedInputCallBack,
            inputCallBack2,
          ]);
          throw new Error('test failed - error should be thrown');
        } catch (receivedError) {
          expect(receivedError).toBeInstanceOf(InputSyntaxError);
          expect(receivedError.errors).toEqual(
            errorDescriptionsArray.concat(errorDescriptionsArray2),
          );
        }
      });
    });

    it('should return one error with list of all descriptions of the errors', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };
      const errorDescriptionsArray = [
        new UseCaseInputErrorDescription(
          ['email is invalid'],
          'email',
          'userDetails',
        ),
      ];
      const inputReadingResult: InputReadingResult = InputReadingResult.createFailed(
        errorDescriptionsArray,
      );
      const inputCallBack = jest.fn().mockReturnValue(inputReadingResult);

      const errorDescriptionsArray2 = [
        new UseCaseInputErrorDescription(
          ['password is too short'],
          'password',
          'userAuthentication',
        ),
      ];
      const inputReadingResult2: InputReadingResult = InputReadingResult.createFailed(
        errorDescriptionsArray2,
      );
      const inputCallBack2 = jest.fn().mockReturnValue(inputReadingResult2);
      expect(() => {
        try {
          inputReader.read(input, [inputCallBack, inputCallBack2]);
          throw new Error(
            'test failed - error should be thrown when read performed',
          );
        } catch (receivedError) {
          expect(receivedError).toBeInstanceOf(InputSyntaxError);
          expect(receivedError.errors).toEqual(
            errorDescriptionsArray.concat(errorDescriptionsArray2),
          );
        }
      });
    });
  });
});
