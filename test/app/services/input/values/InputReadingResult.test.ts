import jest from 'jest';
import { InputReadingResult } from 'src/app/services/input';
import { UseCaseInputErrorDescription } from 'src/domain/errors/operation';

describe('InputReadingResult.class', () => {
  describe('createSucceed.method', () => {
    it('should create instance from type succeed', () => {
      const instance = InputReadingResult.createSucceed([]);
      expect(instance).toBeInstanceOf(InputReadingResult);
      expect(instance.isSucceed()).toBeTruthy();
      expect(instance.fieldSyntaxErrors).toBeUndefined();
    });
  });

  describe('getValue().method', () => {
    it('should return a a value for succeed results with value', () => {
      const instance = InputReadingResult.createSucceed('test');
      expect(instance).toBeInstanceOf(InputReadingResult);
      expect(instance.getValue()).toEqual('test');
      expect(instance.isSucceed()).toBeTruthy();
      expect(instance.fieldSyntaxErrors).toBeUndefined();
    });

    it('should return a a value for succeed results without value', () => {
      const instance = InputReadingResult.createSucceed(undefined);
      expect(instance).toBeInstanceOf(InputReadingResult);
      expect(instance.isSucceed()).toBeTruthy();
      expect(instance.fieldSyntaxErrors).toBeUndefined();
      expect(instance.getValue()).toBeNull();
    });
  });

  describe('createFailed.method - without errors', () => {
    it('should create instance from type failed', () => {
      const instance = InputReadingResult.createFailed();
      expect(instance).toBeInstanceOf(InputReadingResult);
      expect(instance.isSucceed()).toBeFalsy();
      expect(instance.getValue()).toBeUndefined();
    });
  });
  describe('createFailed.method', () => {
    it('should create instance from type with error description', () => {
      const errors = [
        new UseCaseInputErrorDescription(['no error'], 'nowhere'),
      ];
      const instance = InputReadingResult.createFailed(errors);
      expect(instance).toBeInstanceOf(InputReadingResult);
      expect(instance.isSucceed()).toBeFalsy();
      expect(instance.getValue()).toBeUndefined();
      expect(instance.fieldSyntaxErrors).toBe(errors);
    });
  });
});
