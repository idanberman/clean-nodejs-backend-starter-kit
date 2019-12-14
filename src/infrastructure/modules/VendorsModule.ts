import { Module } from '@nestjs/common';
import { VendorController } from 'src/app/controllers/VendorController';
import InterfaceId from 'src/domain/types-interfaces-identifiers';
import { VendorsServiceImpl } from '../services/entities-data-services/vendorsService/VendorsSerivceImpl';

@Module({
  providers: [
    {
      provide: InterfaceId.VendorsService,
      useClass: VendorsServiceImpl,
    },
  ],
  controllers: [VendorController],
})
export class VendorsModule {}
