import { Injectable } from '@nestjs/common';
import {
  AppConfiguration,
  DatabaseConfiguration,
  DatabaseConfigurationSqlDataBaseType,
} from 'src/domain/value-objects/configuration/AppConfiguration';

@Injectable()
export class ConfigurationLoaderService {
  private readonly configuration: AppConfiguration;

  constructor() {
    this.configuration = {
      database: this.getDatabaseConfiguration(),
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
  public getConfiguration(): AppConfiguration {
    return this.configuration;
  }
}
