export class ErrorDescription {
  constructor(public readonly at: string, public readonly errors: string[]) {}

  concat(errorList: ErrorDescription[]): ErrorDescription[] {
    return errorList.map(eachError =>
      eachError.at !== this.at
        ? eachError
        : new ErrorDescription(this.at, this.errors.concat(eachError.errors)),
    );
  }
}
