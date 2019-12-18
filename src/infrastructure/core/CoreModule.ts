import { Module, Global } from '@nestjs/common';
import { ConfigurationLoaderService } from './ConfigurationLoaderService';
import InterfaceId from 'src/domain/types-interfaces-identifiers';
import { CoreContext } from './CoreContext';

@Global()
@Module({
  providers: [
    {
      provide: ConfigurationLoaderService,
      useClass: ConfigurationLoaderService,
    },
    {
      provide: InterfaceId.CoreService,
      useClass: CoreContext,
    },
  ],
  exports: [InterfaceId.CoreService],
})
export class CoreModule {}
