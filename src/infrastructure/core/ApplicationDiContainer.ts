import { Container, interfaces } from 'inversify';
import { AppType } from 'src/app/AppType';
import { ConfigurationProvider } from 'src/app/interfaces';
import { InstanceFactory } from 'src/app/interfaces/InstanceFactory';
import { InputService } from 'src/app/services/input';
import {
  CreateVendorUseCase,
  IndexVendorsUseCase,
  UpdateVendorUseCase,
  ReadOneVendorUseCase,
  DeleteVendorUseCase,
  ChangeVendorDisabledUseCase,
} from 'src/app/use-case/vendors';
import { VendorsRepository } from 'src/domain/vendors';
import { DotenvConfigurationProvider } from '../configuration/DotenvConfigurationProvider';
import { InfrastructureType } from '../InfrastructureType';
import { ClassTransformerValidatorsInputService } from '../input';
import { TypeormVendorsReadWriteRepository } from '../repositories/repositories';
import { TypeormAdapter } from '../repositories/TypeormAdapter';
import { UseCaseInputReader } from 'src/app/services/input/UseCaseInputReader';

export class ApplicationDiContainer {
  private readonly container: Container;
  constructor() {
    this.container = new Container({ autoBindInjectable: true });
    this.bindConfiguration();
    this.bindUseCases();
    this.bindServices();
  }

  public bindConfiguration() {
    this.container
      .bind<ConfigurationProvider>(AppType.ConfigurationProvider)
      .to(DotenvConfigurationProvider);
  }

  public async bindRepositories(): Promise<void> {
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

  public bindUseCases() {
    // Vendors use cases
    this.container
      .bind<IndexVendorsUseCase>(AppType.IndexVendorsUseCase)
      .to(IndexVendorsUseCase);
    this.container
      .bind<ReadOneVendorUseCase>(AppType.ReadOneVendorUseCase)
      .to(ReadOneVendorUseCase);
    this.container
      .bind<CreateVendorUseCase>(AppType.CreateVendorUseCase)
      .to(CreateVendorUseCase);
    this.container
      .bind<UpdateVendorUseCase>(AppType.UpdateVendorUseCase)
      .to(UpdateVendorUseCase);
    this.container
      .bind<ChangeVendorDisabledUseCase>(AppType.ChangeVendorDeletedUseCase)
      .to(ChangeVendorDisabledUseCase);
    this.container
      .bind<DeleteVendorUseCase>(AppType.DeleteVendorUseCase)
      .to(DeleteVendorUseCase);
  }

  public bindServices() {
    // Application Services
    this.container
      .bind<InputService>(AppType.InputService)
      .to(ClassTransformerValidatorsInputService);

    this.container
      .bind<UseCaseInputReader>(AppType.UseCaseInputReader)
      .to(UseCaseInputReader);
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
