import {
  Length,
  IsPhoneNumber,
  IsEmail,
  IsInt,
  IsOptional,
  IsEmpty,
  Allow,
} from 'class-validator';
import { BaseEntityDto } from '../interfaces/BaseEntityDto';
import { ValidationMode } from '../value-objects/validation';
import { Vendor } from './Vendor';

export class VendorDto implements BaseEntityDto {
  constructor(copyFrom: Partial<VendorDto>) {
    const {
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
    } = copyFrom;
    Object.apply(this, {
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

  @Length(0, 80)
  name: string;

  @Length(0, 80)
  contactName: string;

  @IsPhoneNumber('IL')
  contactPhone: string;

  @IsEmail()
  email: string;

  @Length(0, 200)
  address: string;

  @Length(0, 30)
  city: string;

  @Length(0, 10)
  zipCode: string;

  @Length(0, 30)
  budgetClassification: string;
}
