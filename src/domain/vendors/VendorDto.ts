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

export class VendorDto implements BaseEntityDto, Partial<Vendor> {
  @Exclude()
  public readonly id: number;

  @Length(10, 10, { groups: [InputReceivingMode.Create] })
  @IsEmpty({ groups: [InputReceivingMode.Update] })
  public readonly governmentalId: string;

  @Length(3, 80, { always: true })
  public readonly name: string;

  @Length(5, 80, { always: true })
  public readonly contactName: string;

  @IsPhoneNumber('IL', {
    always: true,
  })
  public readonly contactPhone: string;

  @IsEmail(undefined, {
    always: true,
  })
  public readonly email: string;

  @Length(0, 200, { always: true })
  public readonly address: string;

  @Length(0, 30, { always: true })
  public readonly city: string;

  @Length(0, 10, { always: true })
  public readonly zipCode: string;

  @Length(0, 30, { always: true })
  @IsOptional({ always: true })
  public readonly budgetClassification: string;

  public static createFromData(data: Partial<VendorDto>): VendorDto {
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
    } = data;
    const vendorDto = new VendorDto();
    Object.assign(vendorDto, {
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
    return vendorDto;
  }
}
