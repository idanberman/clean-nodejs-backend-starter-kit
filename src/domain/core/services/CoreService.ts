import { AppConfiguration } from '../../value-objects/configuration/AppConfiguration';

export interface CoreService {
  getConfiguration(): AppConfiguration;
}
