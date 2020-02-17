import { Container, interfaces } from 'inversify';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/app/core/interfaces/InstanceFactory';
import { InputService } from 'src/app/services/input';
import {
  CreateVendorUseCase,
  IndexVendorsUseCase,
  UpdateVendorUseCase,
  ReadOneVendorUseCase,
  DeleteVendorUseCase,
  ChangeVendorDeletedStateUseCase,
} from 'src/app/use-case/vendors';
import { VendorsRepository } from 'src/domain/vendors';
import { DotenvConfigurationProvider } from '../configuration/DotenvConfigurationProvider';
import { InfrastructureType } from '../InfrastructureType';
import { ClassTransformerValidatorsInputService } from '../input';
import { TypeormVendorsReadWriteRepository } from '../persistence/typeorm-adapter/repositories';
import { UseCaseInputReader } from 'src/app/use-case/tools/UseCaseInputReader';
import { ConfigurationProvider } from 'src/app/services';
import { TypeormRepositoryFactoryService } from '../persistence/typeorm-adapter/TypeormRepositoryFactoryService';

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
      .bind<TypeormRepositoryFactoryService>(
        InfrastructureType.TypeormRepositoryFactoryService,
      )
      .to(TypeormRepositoryFactoryService)
      .inSingletonScope();

    const dbService: TypeormRepositoryFactoryService = this.container.get<
      TypeormRepositoryFactoryService
    >(InfrastructureType.TypeormRepositoryFactoryService);
    await dbService.asyncInit();

    // Bind repositories
    this.container
      .bind<InstanceFactory<VendorsRepository>>(AppType.VendorsRepository)
      .toFactory((ctx: interfaces.Context) =>
        ctx.container
          .get<TypeormRepositoryFactoryService>(
            InfrastructureType.TypeormRepositoryFactoryService,
          )
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
      .bind<ChangeVendorDeletedStateUseCase>(
        AppType.ChangeVendorDeletedStateUseCase,
      )
      .to(ChangeVendorDeletedStateUseCase);
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

  public get<T>(constructorFunction: interfaces.ServiceIdentifier<T>): T {
    return this.container.get(constructorFunction);
  }

  public injectMock<T>(injectionId, value: new (...args: any[]) => T): void {
    this.container.rebind<T>(injectionId).to(value);
  }
}
