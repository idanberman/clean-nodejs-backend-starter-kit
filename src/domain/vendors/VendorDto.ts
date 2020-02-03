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
import { Exclude } from 'class-transformer';

import { BaseEntityDto } from '../interfaces/BaseEntityDto';
import { Vendor } from './Vendor';
import { InputReceivingMode } from 'src/app/services/input';

export class VendorDto implements BaseEntityDto {
  constructor(fromProps) {
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
    } = fromProps;
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
  @Exclude()
  readonly id: number;

  @Length(10, 10, { groups: [InputReceivingMode.Create] })
  @IsEmpty({ groups: [InputReceivingMode.Update] })
  governmentalId: string;

  @Length(3, 80, { always: true })
  name: string;

  @Length(5, 80, { always: true })
  contactName: string;

  @IsPhoneNumber('IL', {
    always: true,
  })
  contactPhone: string;

  @IsEmail(undefined, {
    always: true,
  })
  email: string;

  @Length(0, 200, { always: true })
  address: string;

  @Length(0, 30, { always: true })
  city: string;

  @Length(0, 10, { always: true })
  zipCode: string;

  @Length(0, 30, { always: true })
  budgetClassification: string;
}
