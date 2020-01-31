import { injectable, inject } from 'inversify';
import { DomainType } from 'src/domain/DomainType';
import { BaseEntity } from 'src/domain/interfaces/BaseEntity';
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
import { Initializable } from 'src/app/interfaces/Initializable';
import { Entities } from './consts/Entities';

export class TypeormDatabaseConnection implements Initializable {
  constructor(private readonly databaseConfiguration: DatabaseConfiguration) {}

  private connection: Connection;

  public async init(): Promise<void> {
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
