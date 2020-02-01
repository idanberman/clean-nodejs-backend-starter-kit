import {
  Length,
  IsPhoneNumber,
  IsEmail,
  IsInt,
  IsOptional,
  IsEmpty,
  Allow,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseEntityDto } from '../interfaces/BaseEntityDto';
import { ValidationMode } from '../value-objects/validation';
import { Vendor } from './Vendor';

export class VendorDto implements BaseEntityDto {
  constructor({
    id,
    governmentalId,
    name = '',
    contactName = '',
    contactPhone = '',
    email = '',
    address = '',
    city = '',
    zipCode = '',
    budgetClassification = '',
  }: Partial<VendorDto>) {
    Object.assign(this, {
      id,
      governmentalId,
      name,
      contactName,
      contactPhone,
      email,
      address,
      city,
      zipCode,
      budgetClassification,
    });
  }
  @IsEmpty()
  readonly id: number;

  @Length(10, 10, { groups: [ValidationMode.Create] })
  @IsEmpty({ groups: [ValidationMode.Update] })
  governmentalId: string;

  @Length(3, 80, { groups: [ValidationMode.Create, ValidationMode.Update] })
  name: string;

  @Length(5, 80, { groups: [ValidationMode.Create, ValidationMode.Update] })
  contactName: string;

  @IsPhoneNumber('IL', {
    groups: [ValidationMode.Create, ValidationMode.Update],
  })
  contactPhone: string;

  @IsEmail(undefined, {
    groups: [ValidationMode.Create, ValidationMode.Update],
  })
  email: string;

  @Length(0, 200, { groups: [ValidationMode.Create, ValidationMode.Update] })
  address: string;

  @Length(0, 30, { groups: [ValidationMode.Create, ValidationMode.Update] })
  city: string;

  @Length(0, 10, { groups: [ValidationMode.Create, ValidationMode.Update] })
  zipCode: string;

  @Length(0, 30, { groups: [ValidationMode.Create, ValidationMode.Update] })
  budgetClassification: string;
}
