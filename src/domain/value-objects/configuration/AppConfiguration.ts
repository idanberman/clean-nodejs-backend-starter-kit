export enum DatabaseConfigurationSqlDataBaseType {
  mariadb = 'mariadb',
}

export interface DatabaseConfiguration {
  readonly type: DatabaseConfigurationSqlDataBaseType;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly synchronize?: boolean;
}

export interface AppConfiguration {
  readonly database: DatabaseConfiguration;
}
