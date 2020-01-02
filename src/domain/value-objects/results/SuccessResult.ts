import { ResultMetaData } from './ResultMetaData';
export class SuccessResult<T> {
  private constructor(
    public readonly data: T,
    public readonly metaData?: ResultMetaData,
  ) {}

  public static create<T>(
    data: T,
    metaData?: ResultMetaData,
  ): SuccessResult<T> {
    return new SuccessResult(data, metaData);
  }
}
