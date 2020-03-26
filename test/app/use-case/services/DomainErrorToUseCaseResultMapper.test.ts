import {
  InputSyntaxError,
  UseCaseInputErrorDescription,
  WriteResourceNotFoundError,
  ReadResourceNotFoundError,
  InvalidInputError,
} from 'src/domain/kernel/errors/operation';
import { DomainError } from 'src/domain/kernel/errors';
import { DomainErrorToUseCaseResultMapper } from 'src/app/use-cases/common/domain-error-mapper';
import { UseCaseResult } from 'src/domain/kernel/use-case/UseCaseResult';
import { UseCaseTerminationStatus } from 'src/domain/kernel/use-case/UseCaseTerminationStatus';

describe('DomainErrorToUseCaseResultConverter.class', () => {
  let mapper: DomainErrorToUseCaseResultMapper;

  beforeEach(() => {
    mapper = new DomainErrorToUseCaseResultMapper();
  });
  describe('convert.method', () => {
    it('should map correctly error from type InputSyntaxError', () => {
      const errorDescriptions = [
        new UseCaseInputErrorDescription(
          ['error'],
          'where the error is',
          'in which section is the error',
        ),
      ];
      const error = new InputSyntaxError(errorDescriptions);
      const result = mapper.map(error);

      expect(result).toBeInstanceOf(UseCaseResult);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.InputSyntaxError,
      );
    });
    it('should map correctly error from type WriteResourceNotFoundError', () => {
      const error = new WriteResourceNotFoundError('id', '7');
      const result = mapper.map(error);

      expect(result).toBeInstanceOf(UseCaseResult);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.UnableProcessInput,
      );
    });
    it('should map correctly error from type ReadResourceNotFoundError', () => {
      const error = new ReadResourceNotFoundError('id', '7');
      const result = mapper.map(error);

      expect(result).toBeInstanceOf(UseCaseResult);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.RequestedDataNotFound,
      );
    });
    it('should map correctly error from type InvalidInputError', () => {
      const error = new InvalidInputError(
        'This username already exist in the system',
        'username',
      );
      const result = mapper.map(error);

      expect(result).toBeInstanceOf(UseCaseResult);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.UnableProcessInput,
      );
    });

    it('should map correctly error from type Unknown error that is implementing DomainError  but is not real one', () => {
      const error: DomainError = {
        domainErrorType: 'OperationFailedCausedByUser',
      };

      Object.defineProperty(error, 'domainErrorType', {
        value: 'UNKNOWN_ERROR_NAME_THAT_NOBODY_CHOOSE',
      });
      const result = mapper.map(error);

      expect(result).toBeInstanceOf(UseCaseResult);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.InternalError,
      );
      expect(result.devNotes?.causedByDomainError?.causedBy?.message).toBe(
        'Error to result mapper Error: unknown Domain error',
      );
    });
    it('should map correctly error from type Unknown error that is no implementing DomainError', () => {
      const error: Error = new Error('UNKNOWN_ERROR_NAME_THAT_NOBODY_CHOOSE');

      const result = mapper.map(error) as UseCaseResult;

      expect(result).toBeInstanceOf(UseCaseResult);
      expect(result.terminationStatus).toBe(
        UseCaseTerminationStatus.InternalError,
      );
      expect(result.devNotes?.causedByDomainError?.causedBy).toBe(error);
    });
  });
});
