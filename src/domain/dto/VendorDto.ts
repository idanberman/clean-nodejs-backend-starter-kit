import { Length, IsPhoneNumber, IsEmail } from 'class-validator';
import BaseDto from './BaseDto';

export class VendorDto implements BaseDto {
  @Length(10, 10)
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
