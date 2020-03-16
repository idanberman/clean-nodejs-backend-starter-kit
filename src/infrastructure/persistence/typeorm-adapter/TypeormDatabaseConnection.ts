import { injectable, inject } from 'inversify';
import { DomainType } from 'src/domain/DomainType';
import {
  AppConfiguration,
  DatabaseConfiguration,
} from 'src/domain/value-objects/configuration';
import {
  Repository,
  Connection,
  ObjectType,
  ConnectionOptions,
  createConnection,
  EntitySchema,
  EntityManager,
} from 'typeorm';
import { AsyncInitializable } from 'src/infrastructure/core/interfaces/AsyncInitializable';
import { Entities } from './consts/Entities';

export class TypeormDatabaseConnection implements AsyncInitializable {
  constructor(private readonly databaseConfiguration: DatabaseConfiguration) {}

  private connection: Connection;

  public async asyncInit(): Promise<void> {
    console.log(
      'connecting to ',
      this.databaseConfiguration.database,
      ' user: ',
      this.databaseConfiguration.username,
    );
    this.connection = await createConnection({
      ...this.databaseConfiguration,
      entities: Entities,
    });
    console.log('connection succeed');
  }

  public isConnected() {
    return this.connection && this.connection.isConnected;
  }

  public getManager(): EntityManager {
    return this.connection.manager;
  }
}
