import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { AsyncInitializable } from 'src/infrastructure/application-container/interfaces/AsyncInitializable';
import { InstanceFactory } from 'src/infrastructure/application-container/interfaces/InstanceFactory';
import { EntityManager, ObjectType } from 'typeorm';
import { NoDatabaseConnectionError } from './errors/NoDatabaseConnectionError';
import { TypeormDatabaseConnection } from './TypeormDatabaseConnection';
import { AppConfiguration } from 'src/domain/kernel/configuration';
import {
  ApplicationUnderlyingResource,
  UnderlyingResourceStateReporter,
} from 'src/infrastructure/application-container/interfaces';
import { InfrastructureType } from 'src/infrastructure/InfrastructureType';
import { ConfigurationProvider } from 'src/app/services/chassis/ConfigurationProvider';

@injectable()
export class TypeormRepositoryFactoryService
  implements ApplicationUnderlyingResource {
  public resourceId = 'TypeormRepositoryFactoryService';
  private underlyingResourceStateReporter: UnderlyingResourceStateReporter;
  private readonly applicationConfiguration: AppConfiguration;

  private readonly connection: TypeormDatabaseConnection;
  constructor(
    @inject(AppType.ConfigurationProvider)
    configurationProvider: ConfigurationProvider,
  ) {
    this.applicationConfiguration = configurationProvider.provide();
    this.connection = new TypeormDatabaseConnection(
      this.applicationConfiguration.database,
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

  public register(
    underlyingResourceStateReporter: UnderlyingResourceStateReporter,
  ): void {
    this.underlyingResourceStateReporter = underlyingResourceStateReporter;
  }
  public getSingletonInjectionToken?(): string | symbol {
    return InfrastructureType.TypeormRepositoryFactoryService;
  }
}
