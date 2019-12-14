import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorsModule } from './infrastructure/modules/VendorsModule';

@Module({
  imports: [VendorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
