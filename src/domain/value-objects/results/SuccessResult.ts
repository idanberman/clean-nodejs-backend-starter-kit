import { ResultMetaData } from './ResultMetaData';
export class SuccessResult<T> {
  constructor(
    public readonly data: T,
    public readonly metaData?: ResultMetaData,
  ) {}
}
