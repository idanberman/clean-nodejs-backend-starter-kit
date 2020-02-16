import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { AsyncInitializable } from 'src/app/core/interfaces/AsyncInitializable';
import { InstanceFactory } from 'src/app/core/interfaces/InstanceFactory';
import { EntityManager, ObjectType } from 'typeorm';
import { NoDatabaseConnectionError } from './errors/NoDatabaseConnectionError';
import { TypeormDatabaseConnection } from './TypeormDatabaseConnection';
import { ConfigurationProvider } from 'src/app/services';

@injectable()
export class TypeormRepositoryFactoryGateWay implements AsyncInitializable {
  private readonly connection: TypeormDatabaseConnection;
  constructor(
    @inject(AppType.ConfigurationProvider)
    private readonly configurationProvider: ConfigurationProvider,
  ) {
    this.connection = new TypeormDatabaseConnection(
      this.configurationProvider.provide().database,
    );
  }

  public getRepositoryFactory<T>(
    customRepository: ObjectType<T>,
  ): InstanceFactory<T> {
    return () => this.getManager().getCustomRepository(customRepository);
  }

  public async asyncInit(): Promise<void> {
    await this.connection.asyncInit();
  }

  private getManager(): EntityManager {
    if (!this.connection.isConnected()) {
      throw new NoDatabaseConnectionError();
    }
    return this.connection.getManager();
  }
}
