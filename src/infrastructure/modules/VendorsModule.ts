import { Module } from '@nestjs/common';
import { VendorsController } from 'src/app/controllers/VendorsController';
import InterfaceId from 'src/domain/types-interfaces-identifiers';
import { VendorsService } from 'src/domain/vendors';
import { TypeormDatabaseModule } from '../database/TypeormDatabaseModule';

@Module({
  imports: [TypeormDatabaseModule],
  providers: [VendorsService],
  controllers: [VendorsController],
})
export class VendorsModule {}
