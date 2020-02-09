import { NoDatabaseConnectionError } from './errors/NoDatabaseConnectionError';
import { EntityManager, ObjectType } from 'typeorm';
import { inject, injectable } from 'inversify';
import { DomainType } from 'src/domain/DomainType';
import { AppConfiguration } from 'src/domain/value-objects/configuration';
import { Initializable } from 'src/app/interfaces/Initializable';
import { TypeormDatabaseConnection } from './TypeormDatabaseConnection';
import { ConfigurationProvider } from 'src/app/interfaces';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/app/interfaces/InstanceFactory';
@injectable()
export class TypeormAdapter implements Initializable {
  private readonly connection: TypeormDatabaseConnection;
  constructor(
    @inject(AppType.ConfigurationProvider)
    private readonly configurationProvider: ConfigurationProvider,
  ) {
    this.connection = new TypeormDatabaseConnection(
      this.configurationProvider.provide().database,
    );
  }

  getRepositoryFactory<T>(customRepository: ObjectType<T>): InstanceFactory<T> {
    return () => this.getManager().getCustomRepository(customRepository);
  }

  async init(): Promise<void> {
    await this.connection.init();
  }

  private getManager(): EntityManager {
    if (!this.connection.isConnected()) {
      throw new NoDatabaseConnectionError();
    }
    return this.connection.getManager();
  }
}
