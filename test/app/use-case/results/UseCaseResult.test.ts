import { UseCaseInputErrorDescription } from 'src/domain/kernel/errors/operation';
import { ApplicationFactory } from 'src/infrastructure/application-container/ApplicationFactory';
import {
  UseCaseResult,
  UseCaseTerminationStatus,
} from 'src/domain/kernel/use-case';

describe('UseCaseResult.class', () => {
  describe('success.method', () => {
    it('should create a success use case result with data', () => {
      const data = { a: 'a' };
      const result = UseCaseResult.success(data);
      expect(result.terminationStatus).toEqual(
        UseCaseTerminationStatus.Succeed,
      );
      expect(result.data).toEqual(data);
      expect(result.metaData).toBeUndefined();
      expect(result.devNotes).toBeUndefined();
    });

    it('should create a success use case result with data and meta-data', () => {
      const data = { a: 'a' };
      const metaData = { b: 'b' };
      const result = UseCaseResult.success(data, metaData);
      expect(result.terminationStatus).toEqual(
        UseCaseTerminationStatus.Succeed,
      );
      expect(result.data).toEqual(data);
      expect(result.metaData).toEqual(metaData);
      expect(result.devNotes).toBeUndefined();
    });

    it('should create a success use case result with data, meta-data and devNotes', () => {
      const data = { a: 'a' };
      const metaData = { b: 'b' };
      const devNotes = { actionId: 'test' };
      const result = UseCaseResult.success(data, metaData, devNotes);
      expect(result.terminationStatus).toEqual(
        UseCaseTerminationStatus.Succeed,
      );
      expect(result.data).toEqual(data);
      expect(result.metaData).toEqual(metaData);
      expect(result.devNotes).toEqual(devNotes);
    });

    it('should create a success use case result with data and devNotes', () => {
      const data = { a: 'a' };
      const devNotes = { actionId: 'test' };
      const result = UseCaseResult.success(data, undefined, devNotes);
      expect(result.terminationStatus).toEqual(
        UseCaseTerminationStatus.Succeed,
      );
      expect(result.data).toEqual(data);
      expect(result.metaData).toBeUndefined();
      expect(result.devNotes).toEqual(devNotes);
    });
  });
  describe('syntaxError.method', () => {
    it('should create a syntaxError use case result with error in a field', () => {
      const at = 'address';
      const useCaseInputErrorDescriptions = [
        new UseCaseInputErrorDescription(['error', 'error2'], at),
      ];
      const result = UseCaseResult.syntaxError(useCaseInputErrorDescriptions);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.InputSyntaxError,
      );
      expect(result.data).toEqual(useCaseInputErrorDescriptions);
      expect(result.metaData).toBeUndefined();
      expect(result.devNotes).toBeUndefined();
    });

    it('should failed create a syntaxError use case result without any error', () => {
      expect(() => UseCaseResult.syntaxError([])).toThrowError();
      expect(() => UseCaseResult.syntaxError(null)).toThrowError();
      expect(() => UseCaseResult.syntaxError(undefined)).toThrowError();
    });
  });

  describe('requestedDataNotFound.method', () => {
    it('should create a requestedDataNotFound use case result without any parameters', () => {
      const result = UseCaseResult.requestedDataNotFound(null);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.RequestedDataNotFound,
      );
      expect(result.data.errorMessage).toBeNull();
      expect(result.data.at).toBeUndefined();
      expect(result.devNotes).toBeUndefined();
    });
    it('should create a requestedDataNotFound use case result with error', () => {
      const error = 'error message';
      const result = UseCaseResult.requestedDataNotFound(error);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.RequestedDataNotFound,
      );
      expect(result.data.errorMessage).toEqual(error);
      expect(result.data.at).toBeUndefined();
      expect(result.devNotes).toBeUndefined();
    });
    it('should create a requestedDataNotFound use case result with error and at definition', () => {
      const error = 'error message';
      const at = 'address';
      const result = UseCaseResult.requestedDataNotFound(error, at);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.RequestedDataNotFound,
      );
      expect(result.data.errorMessage).toEqual(error);
      expect(result.data.at).toEqual(at);
      expect(result.devNotes).toBeUndefined();
    });
  });
  describe('unableProcessInput.method', () => {
    it('should create a unableProcessInput use case result without any parameters', () => {
      const result = UseCaseResult.unableProcessInput(null);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.UnableProcessInput,
      );
      expect(result.data.errorMessage).toBeNull();
      expect(result.data.at).toBeUndefined();
      expect(result.devNotes).toBeUndefined();
    });
    it('should create a requestedDataNotFound use case result with error', () => {
      const error = 'error message';
      const result = UseCaseResult.unableProcessInput(error);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.UnableProcessInput,
      );
      expect(result.data.errorMessage).toEqual(error);
      expect(result.data.at).toBeUndefined();
      expect(result.devNotes).toBeUndefined();
    });
    it('should create a requestedDataNotFound use case result with error and at definition', () => {
      const error = 'error message';
      const at = 'address';
      const result = UseCaseResult.unableProcessInput(error, at);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.UnableProcessInput,
      );
      expect(result.data.errorMessage).toEqual(error);
      expect(result.data.at).toEqual(at);
      expect(result.devNotes).toBeUndefined();
    });
  });

  // TODO: implement all static constructors tests
});
