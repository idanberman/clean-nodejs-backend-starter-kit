import { UseCaseTerminationStatus } from '../definitions/UseCaseTerminationStatus';
import { OperationFailedCausedBySystem, DomainError } from 'src/domain/errors';
import {
  UseCaseInputErrorDescription,
  OperationFailedCausedByUser,
  UnknownSystemFailure,
} from 'src/domain/errors/operation';

interface DevNotes {
  causedBy?: OperationFailedCausedBySystem;
  componentId?: string;
  actionId?: string;
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
    if (!Array.isArray(syntaxErrors) || syntaxErrors.length === 0) {
      throw new TypeError('No syntax errors found');
    }
    return new UseCaseResult(
      UseCaseTerminationStatus.InputSyntaxError,
      syntaxErrors,
    );
  }

  public static requestedDataNotFound(errorMessage: string, at?: string) {
    return new UseCaseResult(UseCaseTerminationStatus.RequestedDataNotFound, {
      errorMessage,
      at,
    });
  }

  public static unableProcessInput(errorMessage: string, at?: string) {
    return new UseCaseResult(UseCaseTerminationStatus.UnableProcessInput, {
      errorMessage,
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

  public fromDomainError(error: DomainError) {
    if (!UseCaseResult.isDomainError(error)) {
      throw TypeError(`'error' is not instance of DomainError`);
    } else if (UseCaseResult.isErrorCausedByUser(error)) {
      UseCaseResult.fromErrorCausedByUser(error);
    } else if (UseCaseResult.isErrorCausedBySystem(error)) {
      UseCaseResult.fromErrorCausedBySystem(error);
    } else {
      throw Error(`Not implemented`);
    }
  }
  public static fromErrorCausedByUser(error: OperationFailedCausedByUser) {
    if (!this.isErrorCausedByUser(error)) {
      throw TypeError(`'error' is not instance of OperationFailedCausedByUser`);
    }

    // TODO:
    // Check type of error, and create result

    return new UseCaseResult(
      UseCaseTerminationStatus.InternalError,
      undefined,
      undefined,
      {},
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
      undefined,
      undefined,
      { causedBy: error },
    );
  }

  public static fromUnknownError(error: Error) {
    return new UseCaseResult(
      UseCaseTerminationStatus.InternalError,
      undefined,
      undefined,
      { causedBy: new UnknownSystemFailure(error) },
    );
  }
}
