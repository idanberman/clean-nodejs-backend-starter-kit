import { DatabaseConfiguration } from 'src/domain/configuration';
import { Connection, createConnection, EntityManager } from 'typeorm';
import { AsyncInitializable } from 'src/infrastructure/application-container/interfaces/AsyncInitializable';
import { ConfiguredPersistentEntities } from '../../core/persistent-entities';
import { TransactionContext } from 'src/domain/interfaces/TransactionContext';
import { TransactionContextTypeormAdapter } from './repositories/common';

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
      entities: ConfiguredPersistentEntities,
    });
    console.log('connection succeed');
  }

  public isConnected(): boolean {
    return !!this.connection?.isConnected;
  }

  public getSlavePersistentTransactionContext(): TransactionContext {
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
