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
import { Exclude, Expose } from 'class-transformer';

import { Vendor } from './Vendor';
import { InputReadingMode } from 'src/app/services/input';
import { BaseEntityDto } from '../definitions';

export class VendorDto implements BaseEntityDto, Partial<Vendor> {
  @Exclude()
  public readonly id: number;

  @IsEmpty({ groups: [InputReadingMode.Update] })
  @Length(10, 10, { groups: [InputReadingMode.Create] })
  @Expose({ groups: [InputReadingMode.Create] })
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
