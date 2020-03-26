import jest from 'jest';
import { IoFormattingResult } from 'src/app/services/io-formatting-service';
import { UseCaseInputErrorDescription } from 'src/domain/kernel/errors/operation';

describe('InputReadingResult.class', () => {
  describe('createSucceed.method', () => {
    it('should create instance from type succeed', () => {
      const instance = IoFormattingResult.createSucceed([]);
      expect(instance).toBeInstanceOf(IoFormattingResult);
      expect(instance.isSucceed()).toBeTruthy();
      expect(instance.fieldSyntaxErrors).toBeUndefined();
    });
  });

  describe('getValue().method', () => {
    it('should return a a value for succeed results with value', () => {
      const instance = IoFormattingResult.createSucceed('test');
      expect(instance).toBeInstanceOf(IoFormattingResult);
      expect(instance.getValue()).toEqual('test');
      expect(instance.isSucceed()).toBeTruthy();
      expect(instance.fieldSyntaxErrors).toBeUndefined();
    });

    it('should return a a value for succeed results without value', () => {
      const instance = IoFormattingResult.createSucceed(undefined);
      expect(instance).toBeInstanceOf(IoFormattingResult);
      expect(instance.isSucceed()).toBeTruthy();
      expect(instance.fieldSyntaxErrors).toBeUndefined();
      expect(instance.getValue()).toBeNull();
    });
  });

  describe('createFailed.method - without errors', () => {
    it('should create instance from type failed', () => {
      const instance = IoFormattingResult.createFailed();
      expect(instance).toBeInstanceOf(IoFormattingResult);
      expect(instance.isSucceed()).toBeFalsy();
      expect(instance.getValue()).toBeUndefined();
    });
  });
  describe('createFailed.method', () => {
    it('should create instance from type with error description', () => {
      const errors = [
        new UseCaseInputErrorDescription(['no error'], 'nowhere'),
      ];
      const instance = IoFormattingResult.createFailed(errors);
      expect(instance).toBeInstanceOf(IoFormattingResult);
      expect(instance.isSucceed()).toBeFalsy();
      expect(instance.getValue()).toBeUndefined();
      expect(instance.fieldSyntaxErrors).toBe(errors);
    });
  });
});
