import { Module } from '@nestjs/common';
import { VendorController } from 'src/app/controllers/VendorController';
import InterfaceId from 'src/domain/types-interfaces-identifiers';
import { VendorsService } from 'src/domain/vendors';

@Module({
  imports: [],
  providers: [
    {
      provide: InterfaceId.VendorsService,
      useClass: VendorsService,
    },
  ],
  controllers: [VendorController],
})
export class VendorsModule {}
