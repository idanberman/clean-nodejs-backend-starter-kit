import { AppConfiguration } from 'src/domain/configuration';

export interface ConfigurationProvider {
  provide(): AppConfiguration;
}
