import {
  InputSyntaxError,
  UseCaseInputErrorDescription,
} from 'src/domain/errors/operation';
import { FailureCode } from 'src/domain/errors/operation/by-user/values/FailureCode';

describe('InputSyntaxError.class', () => {
  describe('ctor.method', () => {
    it('should create a input syntax error with the given error list', () => {
      const errorDescriptionsList: UseCaseInputErrorDescription[] = [
        new UseCaseInputErrorDescription(
          ['test', 'test2'],
          'test',
          'section test',
        ),
      ];
      const syntaxError = new InputSyntaxError(errorDescriptionsList);
      expect(syntaxError).toBeInstanceOf(InputSyntaxError);
      expect(syntaxError.domainErrorType).toEqual(
        'OperationFailedCausedByUser',
      );
      expect(syntaxError.at).toBeUndefined();
      expect(syntaxError.rule).toEqual(FailureCode.SyntaxError);
      expect(syntaxError.errors).toBe(errorDescriptionsList);
    });

    it('should throw error type on empty list or no list of errors', () => {
      expect(() => new InputSyntaxError(null)).toThrowError(TypeError);
      expect(() => new InputSyntaxError(undefined)).toThrowError(TypeError);
      expect(() => new InputSyntaxError([])).toThrowError(TypeError);
    });
  });
});
