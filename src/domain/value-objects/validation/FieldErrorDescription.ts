export class FieldErrorDescription {
  constructor(
    public readonly fieldPath: string,
    public readonly errors: string[],
  ) {}
}
