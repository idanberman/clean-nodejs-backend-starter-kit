import { FieldErrorDescription } from './FieldsErrorDescription';

export class BaseValidationResult<T> {
  constructor(
    public readonly success: boolean,
    public readonly objectToValidate: T,
  ) {}
}
