import { UseCaseInputErrorDescription } from 'src/domain/kernel/errors/operation';

export class IoFormattingResult {
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

  public static createSucceed(value: any): IoFormattingResult {
    return IoFormattingResult.create(undefined, value ? value : null);
  }

  public static createFailed(
    fieldSyntaxErrors?: UseCaseInputErrorDescription[],
  ) {
    return IoFormattingResult.create(fieldSyntaxErrors || [], undefined);
  }

  private static create(
    fieldSyntaxErrors: UseCaseInputErrorDescription[],
    value: any,
  ): IoFormattingResult {
    return new IoFormattingResult(fieldSyntaxErrors, value);
  }
}
