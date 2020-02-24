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
    const InputServiceMock: jest.Mock<InputService> = jest
      .fn()
      .mockImplementation(() => {
        return {
          validInputFromFreeObject: jest.fn(),
        };
      });
    let inputReader: UseCaseInputReader;
    let mockedInputServiceInstance: InputService;

    beforeEach(() => {
      mockedInputServiceInstance = new InputServiceMock();
      inputReader = new UseCaseInputReaderImpl(mockedInputServiceInstance);
    });
    it('The callbacks should be called with the correct UseCaseInput', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };
      const inputReadingResult: InputReadingResult = InputReadingResult.createSucceed(
        'mocked succeed result',
      );
      const inputCallBack = jest.fn().mockReturnValue(inputReadingResult);
      const result = inputReader.read(input, [inputCallBack]);
      expect(inputCallBack).toBeCalledWith(input, mockedInputServiceInstance);
    });

    it('should return values array on success reading', () => {
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

    it('should return error descriptions array on failed reading', () => {
      const input: UseCaseInput = {
        data: 'tested data',
        parameters: 'tested params',
      };
      const errorDescription = new UseCaseInputErrorDescription(
        ['email is invalid'],
        'email',
        'userDetails',
      );
      const inputReadingResult: InputReadingResult = InputReadingResult.createFailed(
        [errorDescription],
      );
      const inputCallBack = jest.fn().mockReturnValue(inputReadingResult);
      expect(() => {
        const results = inputReader.read(input, [inputCallBack]);
      }).toThrow(InputSyntaxError);
      // expect(results[0].fieldSyntaxErrors).toBeInstanceOf(Array);
      // expect(results[0].fieldSyntaxErrors).toHaveLength(1);
      // expect(results[0].fieldSyntaxErrors[0]).toBe(errorDescription);
    });
    // it('should called the input service for each item in the register', () => {
    //   reader.read();
    // });
  });
});
