import { ValueObject } from 'src/domain/kernel/ddd';

type ResultType = any;
type PaginationMetaData = {
  totalResultsCount: number;
  currentPage: number;
  perPage: number;
};
type ReadingResultProperties<T extends ResultType> = {
  metadata: {
    isList: boolean;
    pagination?: {
      totalResultsCount: number;
      currentPage: number;
      perPage: number;
    };
  };
  data: T | T[];
};

export class ReadingResult<T extends ResultType> extends ValueObject<
  ReadingResultProperties<T>
> {
  constructor(readingResultProperties: ReadingResultProperties<T>) {
    super(readingResultProperties);
  }

  get isList(): boolean {
    return this._properties.metadata.isList;
  }

  get pagination() {}
}
