interface PaginationMetaData {
  totalItems: number;
  perPage: number;
  pageNumber: number;
}

export interface ResponseMetaData {
  pagination?: PaginationMetaData;
}
