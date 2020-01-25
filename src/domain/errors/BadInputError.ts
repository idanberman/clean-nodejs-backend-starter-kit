import { FieldErrorDescription } from '../value-objects/validation/FieldErrorDescription';

export class BadInputError {
  constructor(
    public readonly message: string,
    public readonly fileds?: FieldErrorDescription[],
  ) {}
}
