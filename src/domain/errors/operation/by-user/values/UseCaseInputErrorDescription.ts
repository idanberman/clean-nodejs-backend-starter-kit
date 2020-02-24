export class UseCaseInputErrorDescription {
  constructor(
    public readonly errors: string[],
    public readonly at: string,
    public readonly section?: string,
  ) {}

  private addErrorToExistCoordinates(
    errorToAdd: UseCaseInputErrorDescription,
    errorDescriptionList: UseCaseInputErrorDescription[],
  ): UseCaseInputErrorDescription[] {
    return errorDescriptionList.map(eachError =>
      eachError.at !== this.at || eachError.section !== this.section
        ? eachError
        : new UseCaseInputErrorDescription(
            Array.from(new Set([...errorToAdd.errors, ...eachError.errors])),
            errorToAdd.at,
            errorToAdd.section,
          ),
    );
  }

  public withSection(section: string): UseCaseInputErrorDescription {
    return new UseCaseInputErrorDescription(this.errors, this.at, section);
  }

  public concat(
    errorDescriptionList: UseCaseInputErrorDescription[],
  ): UseCaseInputErrorDescription[] {
    const isAlreadyErrorsExist: boolean =
      errorDescriptionList.filter(
        (errorDescription: UseCaseInputErrorDescription) =>
          errorDescription.at === this.at &&
          errorDescription.section === this.section,
      ).length > 0;
    return isAlreadyErrorsExist
      ? this.addErrorToExistCoordinates(this, errorDescriptionList)
      : errorDescriptionList.concat([this]);
  }
}
