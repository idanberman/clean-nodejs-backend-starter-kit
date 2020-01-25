import { ValidationResultMetaData } from './meta-data';

export class ValidationSuccessResult<T> {
  constructor(
    public readonly metaData: ValidationResultMetaData<T>,
    public readonly validValue: T,
  ) {}
}
