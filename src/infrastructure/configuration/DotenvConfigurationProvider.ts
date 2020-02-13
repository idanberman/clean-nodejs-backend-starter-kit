import {
  AppConfiguration,
  DatabaseConfiguration,
  DatabaseConfigurationSqlDataBaseType,
  WebServerConfiguration,
} from 'src/domain/value-objects/configuration/AppConfiguration';
import dotenv = require('dotenv');
import { injectable } from 'inversify';
import { ConfigurationProvider } from 'src/app/services';
dotenv.config();

@injectable()
export class DotenvConfigurationProvider implements ConfigurationProvider {
  private readonly configuration: AppConfiguration;

  constructor() {
    this.configuration = {
      database: this.getDatabaseConfiguration(),
      webServer: this.getWebServerConfiguration(),
    };
  }

  private getDatabaseConfiguration(): DatabaseConfiguration {
    const { env } = process;
    return {
      type: DatabaseConfigurationSqlDataBaseType.mariadb,
      host: env.DATABASE_HOST || 'localhost',
      port: parseInt(env.DATABASE_PORT, 10) || 3306,
      username: env.DATABASE_USERNAME || 'root',
      password: env.DATABASE_PASSWORD || '',
      database: env.DATABASE_DB_NAME || '',
      synchronize: true,
    };
  }
  private getWebServerConfiguration(): WebServerConfiguration {
    const { env } = process;
    return {
      httpPort: parseInt(env.WEB_SERVER_HTTP_PORT, 10) || 3000,
    };
  }
  public provide(): AppConfiguration {
    return this.configuration;
  }
}
