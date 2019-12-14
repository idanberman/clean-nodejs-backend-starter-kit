import { FieldErrorDescription } from './FieldsErrorDescription';

export class ValidationResult {
  constructor(
    public readonly success: boolean,
    public readonly fieldErrorDescription: FieldErrorDescription[],
  ) {}
}
