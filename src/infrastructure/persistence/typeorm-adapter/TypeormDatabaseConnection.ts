import { injectable, inject } from 'inversify';
import {
  AppConfiguration,
  DatabaseConfiguration,
} from 'src/domain/configuration';
import {
  Repository,
  Connection,
  ObjectType,
  ConnectionOptions,
  createConnection,
  EntitySchema,
  EntityManager,
  ConnectionManager,
} from 'typeorm';
import { AsyncInitializable } from 'src/infrastructure/application-container/interfaces/AsyncInitializable';
import { ConfiguredDbEntities } from '../../core/db-entities';
import { TransactionContext } from 'src/domain/interfaces/TransactionContext';
import { TransactionContextTypeormAdapter } from './repositories/TransactionContextTypeormAdapter';

export class TypeormDatabaseConnection implements AsyncInitializable {
  constructor(private readonly databaseConfiguration: DatabaseConfiguration) {}

  private connection: Connection;

  public async asyncInit(): Promise<void> {
    this.connection;
    console.log(
      'connecting to ',
      this.databaseConfiguration.database,
      ' user: ',
      this.databaseConfiguration.username,
    );
    this.connection = await createConnection({
      ...this.databaseConfiguration,
      entities: ConfiguredDbEntities,
    });
    console.log('connection succeed');
  }

  public isConnected(): boolean {
    return !!this.connection?.isConnected;
  }

  public getSlaveDbTransactionContext(): TransactionContext {
    return new TransactionContextTypeormAdapter(
      this.connection.createQueryRunner('slave'),
    );
  }

  public getTransactionContext(): TransactionContext {
    return new TransactionContextTypeormAdapter(
      this.connection.createQueryRunner('master'),
    );
  }
  public getManager(): EntityManager {
    return this.connection.manager;
  }
}
