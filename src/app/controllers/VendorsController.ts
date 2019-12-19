import { Controller, Get, Inject } from '@nestjs/common';
import { Vendor } from 'src/domain/entities/Vendor';
import InterfaceId from 'src/domain/types-interfaces-identifiers';
import { SuccessResponse } from 'src/domain/value-objects';
import { VendorsService } from 'src/domain/vendors';

@Controller('vendors')
export class VendorsController {
  constructor(
    @Inject(InterfaceId.VendorsService)
    private readonly vendorsService: VendorsService,
  ) {}
  @Get()
  async getFind(): Promise<SuccessResponse<Vendor[]>> {
    return await this.vendorsService.find();
  }
}
