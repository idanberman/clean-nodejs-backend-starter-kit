import { UseCaseInputErrorDescription } from 'src/domain/errors/operation';

export class InputReadingResult {
  private constructor(
    public readonly fieldSyntaxErrors: UseCaseInputErrorDescription[],
    private readonly value: any,
  ) {}

  public isSucceed(): boolean {
    return this.fieldSyntaxErrors === undefined;
  }

  public getValue<T>(): T {
    return this.value as T;
  }

  public static createSucceed(value: any): InputReadingResult {
    return InputReadingResult.create(undefined, value ? value : null);
  }

  public static createFailed(
    fieldSyntaxErrors?: UseCaseInputErrorDescription[],
  ) {
    return InputReadingResult.create(fieldSyntaxErrors || [], undefined);
  }

  private static create(
    fieldSyntaxErrors: UseCaseInputErrorDescription[],
    value: any,
  ): InputReadingResult {
    return new InputReadingResult(fieldSyntaxErrors, value);
  }
}
