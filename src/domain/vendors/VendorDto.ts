import { Exclude, Expose } from 'class-transformer';

import { Vendor } from './Vendor';
import { IoFormattingMode } from 'src/app/services/io-formatting-service';
import { VendorProperties } from './VendorProperties';
import { HasFormattingSchema } from '../kernel/building-blocks/types';
import {
  IsEmpty,
  Length,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class VendorDto extends HasFormattingSchema implements VendorProperties {
  @Exclude()
  public readonly id: number;

  @IsEmpty({ groups: [IoFormattingMode.Update] })
  @Length(10, 10, { groups: [IoFormattingMode.Create] })
  @Expose({ groups: [IoFormattingMode.Create] })
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

  @IsInt({ groups: [IoFormattingMode.Update] })
  @Min(2, { always: true })
  public version: number;
  public static getInputSyntaxSchema() {
    return VendorDto;
  }

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
