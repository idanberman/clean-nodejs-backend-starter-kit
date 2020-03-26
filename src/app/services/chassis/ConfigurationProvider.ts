import { AppConfiguration } from 'src/domain/kernel/configuration';

export interface ConfigurationProvider {
  provide(): AppConfiguration;
}
