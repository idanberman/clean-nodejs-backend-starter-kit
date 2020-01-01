import { BaseRepository } from 'src/domain/interfaces/BaseRepository';
import { NoDatabaseConnectionError } from './errors/NoDatabaseConnectionError';
import { Connection, ObjectType, EntityManager } from 'typeorm';
import { BaseEntity } from 'src/domain/interfaces/BaseEntity';
import { inject, injectable } from 'inversify';
import { DomainType } from 'src/domain/DomainType';
import { AppConfiguration } from 'src/domain/value-objects/configuration';
import { Initializable } from 'src/app/interfaces/Initializable';
import { TypeormDatabaseConnection } from './TypeormDatabaseConnection';
import { ConfigurationProvider } from '../core/ConfigurationProvider';
@injectable()
export class TypeormDatabaseService implements Initializable {
  private readonly connection: TypeormDatabaseConnection;
  constructor(
    @inject(DomainType.ConfigurationProvider)
    private readonly configurationProvider: ConfigurationProvider,
  ) {
    this.connection = new TypeormDatabaseConnection(
      this.configurationProvider.provide().database,
    );
  }

  async init(): Promise<void> {
    await this.connection.init();
  }

  public getManager(): EntityManager {
    if (!this.connection.isConnected()) {
      throw new NoDatabaseConnectionError();
    }
    return this.connection.getManager();
  }
}
