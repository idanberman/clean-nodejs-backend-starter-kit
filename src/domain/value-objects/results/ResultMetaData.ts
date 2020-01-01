interface PaginationMetaData {
  totalItems: number;
  perPage: number;
  pageNumber: number;
}

export interface ResultMetaData {
  pagination?: PaginationMetaData;
}
