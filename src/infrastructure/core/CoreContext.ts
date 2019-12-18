import { Injectable, Inject } from '@nestjs/common';
import { AppConfiguration } from 'src/domain/value-objects/configuration/AppConfiguration';
import { ConfigurationLoaderService } from './ConfigurationLoaderService';
import { CoreService } from 'src/domain/core/services/CoreService';

@Injectable()
export class CoreContext implements CoreService {
  constructor(
    @Inject(ConfigurationLoaderService)
    private readonly configurationLoaderService: ConfigurationLoaderService,
  ) {}
  getConfiguration(): AppConfiguration {
    return this.configurationLoaderService.getConfiguration();
  }
}
