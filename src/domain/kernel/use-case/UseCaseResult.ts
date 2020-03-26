import {
  OperationFailedCausedBySystem,
  DomainError,
} from 'src/domain/kernel/errors';
import e = require('express');
import {
  UseCaseInputErrorDescription,
  OperationFailedCausedByUser,
  UnknownSystemFailure,
} from 'src/domain/kernel/errors/operation';
import { UseCaseTerminationStatus } from '.';

interface DevNotes {
  causedByDomainError?: OperationFailedCausedBySystem;
  componentId?: string;
  actionId?: string;
  note?: string;
  parameters?: object;
}

export class UseCaseResult {
  private constructor(
    public readonly terminationStatus: UseCaseTerminationStatus,
    public readonly data?: any,
    public readonly metaData?: any,
    public readonly devNotes?: DevNotes,
  ) {}

  public static success(
    data?: any,
    metadata?: any,
    devNotes?: DevNotes,
  ): UseCaseResult {
    return new UseCaseResult(
      UseCaseTerminationStatus.Succeed,
      !!data ? data : null,
      metadata,
      devNotes,
    );
  }

  public static syntaxError(
    syntaxErrors: UseCaseInputErrorDescription[],
  ): UseCaseResult {
    if (
      !syntaxErrors ||
      !Array.isArray(syntaxErrors) ||
      syntaxErrors.length === 0
    ) {
      throw new TypeError('No syntax errors found');
    }
    return new UseCaseResult(
      UseCaseTerminationStatus.InputSyntaxError,
      syntaxErrors,
    );
  }

  public static requestedDataNotFound(errorMessage: string, at?: string) {
    return new UseCaseResult(UseCaseTerminationStatus.RequestedDataNotFound, {
      errorMessage: errorMessage ?? null,
      at,
    });
  }

  public static unableProcessInput(errorMessage: string, at?: string) {
    return new UseCaseResult(UseCaseTerminationStatus.UnableProcessInput, {
      errorMessage: errorMessage ?? null,
      at,
    });
  }

  private static isDomainError(
    toBeDetermined: any,
  ): toBeDetermined is DomainError {
    return toBeDetermined.domainErrorType !== undefined;
  }

  private static isErrorCausedByUser(
    toBeDetermined: any,
  ): toBeDetermined is OperationFailedCausedByUser {
    return toBeDetermined.domainErrorType === 'OperationFailedCausedByUser';
  }

  private static isErrorCausedBySystem(
    toBeDetermined: any,
  ): toBeDetermined is OperationFailedCausedBySystem {
    return toBeDetermined.domainErrorType === 'OperationFailedCausedBySystem';
  }

  public static fromDomainError(error: DomainError): UseCaseResult {
    try {
      if (UseCaseResult.isErrorCausedByUser(error)) {
        return UseCaseResult.fromErrorCausedByUser(error);
      } else if (UseCaseResult.isErrorCausedBySystem(error)) {
        return UseCaseResult.fromErrorCausedBySystem(error);
      } else {
        throw Error(`Error to result mapper Error: unknown Domain error`);
      }
    } catch (e) {
      return UseCaseResult.fromUnknownError(e);
    }
  }
  public static fromErrorCausedByUser(error: OperationFailedCausedByUser) {
    return new UseCaseResult(
      UseCaseTerminationStatus.UnableProcessInput,
      'Unable to process request, please validate all fields are filled correctly.',
      undefined,
      {
        note:
          'Unimplemented handler to domain error from type OperationFailedCausedByUser',
        componentId: 'UseCaseResult',
        actionId: 'fromErrorCausedByUser',
        parameters: { error },
      },
    );
  }

  public static fromErrorCausedBySystem(error: OperationFailedCausedBySystem) {
    if (!this.isErrorCausedBySystem(error)) {
      throw TypeError(
        `'error' is not instance of OperationFailedCausedBySystem`,
      );
    }
    return new UseCaseResult(
      UseCaseTerminationStatus.InternalError,
      'Sorry, we can not fulfill your request right now. please try again later.',
      undefined,
      {
        note: 'OperationFailedCausedBySystem error',
        causedByDomainError: error,
      },
    );
  }

  public static fromUnknownError(error: Error) {
    return new UseCaseResult(
      UseCaseTerminationStatus.InternalError,
      undefined,
      { caughtUnknownError: error },
      { causedByDomainError: new UnknownSystemFailure(error) },
    );
  }
}
