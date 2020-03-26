import {
  IoFormattingService,
  IoFormattingResult,
} from 'src/app/services/io-formatting-service';
import {
  UseCaseInputErrorDescription,
  InputSyntaxError,
} from 'src/domain/kernel/errors/operation';
import {
  MultiInputReaderImpl,
  MultiInputReader,
} from 'src/app/services/multi-input-reader';
import { UseCaseInput } from 'src/domain/kernel/use-case';

describe('MultiInputReader.class', () => {
  describe('read.method', () => {
    const validInputFromFreeObjectMock = jest
      .fn()
      .mockImplementation((toValue, input: UseCaseInput) =>
        IoFormattingResult.createSucceed({
          expectedShape: input,
        }),
      );

    const IoFormattingServiceMock: jest.Mock<IoFormattingService> = jest
      .fn()
      .mockImplementation(() => {
        return {
          validInputFromFreeShapeObject: validInputFromFreeObjectMock,
        };
      });
    let multiInputReader: MultiInputReader;

    beforeEach(() => {
      IoFormattingServiceMock.mockClear();
      multiInputReader = new MultiInputReaderImpl(IoFormattingServiceMock());
    });

    it('The callbacks should be called with the correct UseCaseInput', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };

      const [readValue] = multiInputReader.read(input, [
        (input: UseCaseInput, ioFormattingService: IoFormattingService) => {
          return ioFormattingService.formatObject('expectedShapeValue', input);
        },
      ]);
      expect(readValue).toEqual({ expectedShape: input });
    });

    it('should return single value list on success reading', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };
      const inputReadingResult: IoFormattingResult = IoFormattingResult.createSucceed(
        String('mocked succeed result'),
      );
      const inputCallBack = jest.fn().mockReturnValue(inputReadingResult);
      const results = multiInputReader.read(input, [inputCallBack]);
      expect(results).toBeInstanceOf(Array);

      expect(results[0]).toEqual(String('mocked succeed result'));
    });

    it('should return list of many values on success reading', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };
      const inputReadingResult: IoFormattingResult = IoFormattingResult.createSucceed(
        String('mocked succeed result'),
      );
      const inputCallBack = jest.fn().mockReturnValue(inputReadingResult);

      const inputReadingResult2: IoFormattingResult = IoFormattingResult.createSucceed(
        String('mocked succeed result2'),
      );
      const inputCallBack2 = jest.fn().mockReturnValue(inputReadingResult2);
      const results = multiInputReader.read(input, [
        inputCallBack,
        inputCallBack2,
      ]);
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
      const inputReadingResult: IoFormattingResult = IoFormattingResult.createFailed(
        errorDescriptionsArray,
      );
      const inputCallBack = jest.fn().mockReturnValue(inputReadingResult);
      expect(() => {
        try {
          multiInputReader.read(input, [inputCallBack]);
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
      const inputReadingResult: IoFormattingResult = IoFormattingResult.createFailed(
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
      const inputReadingResult2: IoFormattingResult = IoFormattingResult.createFailed(
        errorDescriptionsArray2,
      );
      const inputCallBack2 = jest.fn().mockReturnValue(inputReadingResult2);

      const succeedInputReadingResult: IoFormattingResult = IoFormattingResult.createSucceed(
        String('mocked succeed result'),
      );
      const succeedInputCallBack = jest
        .fn()
        .mockReturnValue(succeedInputReadingResult);

      expect(() => {
        try {
          multiInputReader.read(input, [
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
      const inputReadingResult: IoFormattingResult = IoFormattingResult.createFailed(
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
      const inputReadingResult2: IoFormattingResult = IoFormattingResult.createFailed(
        errorDescriptionsArray2,
      );
      const inputCallBack2 = jest.fn().mockReturnValue(inputReadingResult2);
      expect(() => {
        try {
          multiInputReader.read(input, [inputCallBack, inputCallBack2]);
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
