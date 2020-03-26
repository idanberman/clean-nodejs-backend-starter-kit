export type AggregateUuidType = string | number;
export interface AggregateIdentity<T extends AggregateUuidType> {
  aggregateUuid: T;
  aggregationType: string;
}
