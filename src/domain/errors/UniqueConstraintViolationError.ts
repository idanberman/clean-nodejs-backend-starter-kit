import { BadInputError } from './operation/BadInputError';
import { FieldErrorDescription } from '../value-objects';

export class UniqueConstraintViolationError {
  public readonly fieldsName: string[];
  constructor(fieldsName: string[] | string) {
    if (Array.isArray(fieldsName)) {
      this.fieldsName = fieldsName;
    } else {
      this.fieldsName = [fieldsName];
    }
  }

  toBadInputError(): BadInputError {
    const converter = new UniqueConstraintViolationError.UniqueConstraintViolationToFieldErrorDescriptiononverter();
    return new BadInputError([converter.convert(this)]);
  }

  static UniqueConstraintViolationToFieldErrorDescriptiononverter = class {
    convert(
      uniqueConstraintViolationError: UniqueConstraintViolationError,
      fieldPath?: string,
    ): FieldErrorDescription {
      return new FieldErrorDescription(
        fieldPath || uniqueConstraintViolationError.fieldsName.join(', '),
        [
          `Already used value inserted to unique field '${fieldPath ||
            uniqueConstraintViolationError.fieldsName}'`,
        ],
      );
    }
  };
}
