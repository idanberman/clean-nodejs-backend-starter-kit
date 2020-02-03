import { ConfigurationProvider } from 'src/app/interfaces';
import { DotenvConfigurationProvider } from '../configuration/DotenvConfigurationProvider';
import { AppType } from 'src/app/AppType';
import { Container, interfaces } from 'inversify';
import { TypeormAdapter } from '../repositories/TypeormAdapter';
import { InfrastructureType } from '../InfrastructureType';
import { VendorsRepository } from 'src/domain/vendors';
import { DomainType } from 'src/domain/DomainType';
import { TypeormVendorsReadWriteRepository } from '../repositories/repositories';
import { InstanceFactory } from 'src/app/interfaces/InstanceFactory';
import { IndexVendorsUseCase, CreateVendorUseCase } from 'src/app/vendors';
import { ClassTransformerValidatorsInputService } from '../input';
import { InputService } from 'src/app/services/input';

export class ApplicationDiContainer {
  private readonly container: Container;
  constructor() {
    this.container = new Container({ autoBindInjectable: true });
    this.bindConfiguration();
    this.bindUseCases();
    this.bindServices();
  }

  bindConfiguration() {
    this.container
      .bind<ConfigurationProvider>(AppType.ConfigurationProvider)
      .to(DotenvConfigurationProvider);
  }

  async bindRepositories(): Promise<void> {
    // Bind connection provider
    this.container
      .bind<TypeormAdapter>(InfrastructureType.TypeormAdapter)
      .to(TypeormAdapter)
      .inSingletonScope();

    const dbService: TypeormAdapter = this.container.get<TypeormAdapter>(
      InfrastructureType.TypeormAdapter,
    );
    await dbService.init();

    // Bind repositories
    this.container
      .bind<InstanceFactory<VendorsRepository>>(AppType.VendorsRepository)
      .toFactory((ctx: interfaces.Context) =>
        ctx.container
          .get<TypeormAdapter>(InfrastructureType.TypeormAdapter)
          .getRepositoryFactory(TypeormVendorsReadWriteRepository),
      );
  }

  bindUseCases() {
    this.container
      .bind<IndexVendorsUseCase>(AppType.IndexVendorsUseCase)
      .to(IndexVendorsUseCase);

    this.container
      .bind<CreateVendorUseCase>(AppType.CreateVendorUseCase)
      .to(CreateVendorUseCase);
  }

  bindServices() {
    // Application Services
    this.container
      .bind<InputService>(AppType.InputService)
      .to(ClassTransformerValidatorsInputService);
  }

  // public static async getContainer(): Promise<Container> {
  //   const container: Container = new Container({ autoBindInjectable: true });
  //   // Micro-service infrastructure
  //   container;

  //   // Domain Services
  //   container
  //     .bind<VendorsService>(DomainType.VendorsService)
  //     .toService(VendorsService);

  //   // Domain Entities
  //   container.bind<Vendor>(Vendor).toSelf();

  //   // init external services

  //   // Db will be abele to be bind as needed after this issue will be resolved
  //   // https://github.com/inversify/InversifyJS/pull/1132
  //   const dbService = container.get<TypeormRepositoryFactoryProvider>(
  //     InfrastructureType.DatabaseService,
  //   );
  //   await dbService.init();

  //   return container;
  // }

  public get<T>(constructorFunction: interfaces.ServiceIdentifier<T>): T {
    return this.container.get(constructorFunction);
  }

  public injectMock<T>(injectionId, value: new (...args: any[]) => T): void {
    this.container.rebind<T>(injectionId).to(value);
  }
}
