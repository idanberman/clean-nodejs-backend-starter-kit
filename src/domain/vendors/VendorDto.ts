import {
  Length,
  IsPhoneNumber,
  IsEmail,
  IsInt,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { BaseDto } from '../interfaces/BaseDto';
import { ValidationMode } from '../value-objects/validation';

export class VendorDto implements BaseDto {
  @IsInt()
  @IsOptional()
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
