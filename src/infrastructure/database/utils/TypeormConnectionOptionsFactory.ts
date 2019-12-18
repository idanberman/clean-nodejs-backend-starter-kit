import { DatabaseConfiguration } from 'src/domain/value-objects/configuration/AppConfiguration';
import { ConnectionOptions } from 'typeorm';
export class TypeormConnectionOptionsFactory {
  public static get(configuration: DatabaseConfiguration): ConnectionOptions {
    return Object.assign({}, configuration);
  }
}
