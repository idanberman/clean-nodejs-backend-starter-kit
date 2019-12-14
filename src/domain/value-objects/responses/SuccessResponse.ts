import { ResponseMetaData } from './ResponseMetaData';
export class SuccessResponse<T> {
  constructor(
    public readonly data: T,
    public readonly metaData?: ResponseMetaData,
  ) {}
}
