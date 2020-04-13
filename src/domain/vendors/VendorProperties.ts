import { AggregateRootProperties } from '../kernel/ddd';

export type VendorProperties = AggregateRootProperties & {
  governmentalId: string;
  name: string;
  contactName: string;
  contactPhone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  budgetClassification: string;
};
