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
import { AsyncInitializable } from 'src/app/interfaces/AsyncInitializable';
import { Entities } from './consts/Entities';

export class TypeormDatabaseConnection implements AsyncInitializable {
  constructor(private readonly databaseConfiguration: DatabaseConfiguration) {}

  private connection: Connection;

  public async asyncInit(): Promise<void> {
    this.connection = await createConnection({
      ...this.databaseConfiguration,
      entities: Entities,
    });
  }

  public isConnected() {
    return this.connection && this.connection.isConnected;
  }

  public getManager(): EntityManager {
    return this.connection.manager;
  }
}
