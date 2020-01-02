import { FieldErrorDescription } from '../value-objects/validation/FieldsErrorDescription';

export class BadInputError {
  constructor(
    public readonly message: string,
    public readonly fileds?: FieldErrorDescription[],
  ) {}
}
