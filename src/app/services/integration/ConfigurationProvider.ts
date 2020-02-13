import { AppConfiguration } from 'src/domain/value-objects/configuration';

export interface ConfigurationProvider {
  provide(): AppConfiguration;
}
