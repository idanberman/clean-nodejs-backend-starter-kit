import { ValidationResultMetaData } from './meta-data/';
import { FieldErrorDescription } from './FieldErrorDescription';

export class ValidationFailedResult<T> {
  constructor(
    public readonly metaData: ValidationResultMetaData<T>,
    public readonly fieldErrorDescription: FieldErrorDescription[],
  ) {}
}
