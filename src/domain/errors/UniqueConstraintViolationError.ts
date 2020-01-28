export class UniqueConstraintViolationError {
  public readonly fieldsName: string[];
  constructor(fieldsName: string[] | string) {
    if (Array.isArray(fieldsName)) {
      this.fieldsName = fieldsName;
    } else {
      this.fieldsName = [fieldsName];
    }
  }
}
