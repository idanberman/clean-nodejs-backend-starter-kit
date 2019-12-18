import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorsModule } from './infrastructure/modules/VendorsModule';
import { CoreModule } from './infrastructure/core/CoreModule';
import { TypeormDatabaseModule } from './infrastructure/database/TypeormDatabaseModule';

@Module({
  imports: [CoreModule, TypeormDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
