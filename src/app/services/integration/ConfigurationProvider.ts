import { AppConfiguration } from 'src/domain/value-objects/configuration/AppConfiguration';

export interface ConfigurationProvider {
  provide(): AppConfiguration;
}
